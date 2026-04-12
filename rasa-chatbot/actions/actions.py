"""
Custom Actions for MuseumPass Bangalore Chatbot
Handles museum data lookup, booking logic, and payment redirect.
"""

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet, AllSlotsReset, FollowupAction
from datetime import datetime, timedelta
import json
import re

# ============================================================
# Translation Helper
# ============================================================

LANG_MAP = {
    "en": "english", "hi": "hindi", "kn": "kannada", "ta": "tamil",
    "te": "telugu", "bn": "bengali", "mr": "marathi", "gu": "gujarati",
    "ml": "malayalam", "pa": "punjabi", "or": "odia", "as": "assamese",
    "ur": "urdu"
}

_translation_cache = {}

def translate_text(text, lang_code):
    """Translate text to the target language. Returns original if English or on error."""
    if not lang_code or lang_code == "en" or lang_code not in LANG_MAP:
        return text
    
    cache_key = (text, lang_code)
    if cache_key in _translation_cache:
        return _translation_cache[cache_key]
    
    try:
        from deep_translator import GoogleTranslator
        translated = GoogleTranslator(source='en', target=lang_code).translate(text)
        if translated:
            _translation_cache[cache_key] = translated
            return translated
    except Exception as e:
        print(f"Translation error: {e}")
    return text

def t(tracker, text):
    """Shorthand: translate text using the tracker's language slot."""
    lang = tracker.get_slot("language") or "en"
    return translate_text(text, lang)

# ============================================================
# Museum Data (Fetched dynamically from API)
# ============================================================
import requests

API_URL = "http://localhost:5000/api"
_cached_museums = None

def get_all_museums():
    global _cached_museums
    if not _cached_museums:
        try:
            res = requests.get(f"{API_URL}/museums", timeout=5)
            res.raise_for_status()
            data = res.json()
            _cached_museums = {m.get("_id", m.get("id")): m for m in data}
        except Exception as e:
            print(f"Error fetching museums: {e}")
            _cached_museums = {}
    return _cached_museums

def get_museum(tracker):
    """Get museum data from slot."""
    museum_id = tracker.get_slot("selected_museum")
    museums = get_all_museums()
    if museum_id and museum_id in museums:
        return museums[museum_id]
    return None

def resolve_museum_id(raw_value):
    """Resolve a free-text museum name to a museum dict key."""
    if not raw_value:
        return None

    val = raw_value.strip().lower()
    museums = get_all_museums()

    # 1. Exact key match
    if val in museums:
        return val

    # 2. Check aliases and names
    for mid, mdata in museums.items():
        if val in mdata.get("shortName", "").lower() or val in mdata.get("name", "").lower():
            return mid
        if mdata.get("shortName", "").lower() in val or mdata.get("name", "").lower() in val:
            return mid
        # Check aliases array
        for alias in mdata.get("aliases", []):
            if val in alias.lower() or alias.lower() in val:
                return mid
    return None


def normalize_category(cat_str, museum):
    categories = museum.get("ticketCategories", []) if museum else []
    # Fallback if empty to avoid crashing
    if not categories:
        categories = [{"name": "Adult", "price": 300}, {"name": "Child", "price": 100}, {"name": "Senior Citizen", "price": 150}, {"name": "Student", "price": 150}, {"name": "Foreign National", "price": 650}]

    for c in categories:
        cat_name = c["name"].lower()
        if cat_name in cat_str.lower() or cat_str.lower() in cat_name:
            return c["name"]
        if cat_str.lower().endswith('s') and cat_str.lower()[:-1] in cat_name:
            return c["name"]
        if cat_str.lower() in ['kid', 'kids', 'children'] and c["name"].lower() == "child":
            return c["name"]
    return None

def extract_breakdown_from_entities(entities, museum):
    category_entities = [e for e in entities if e["entity"] == "ticket_category"]
    qty_entities = [e for e in entities if e["entity"] == "quantity"]
    
    breakdown = {}
    if category_entities:
        for cat in category_entities:
            norm_cat = normalize_category(cat["value"], museum)
            if not norm_cat:
                continue
                
            closest_qty = None
            if qty_entities:
                min_dist = 9999
                for q in qty_entities:
                    dist = min(abs(cat["start"] - q["end"]), abs(q["start"] - cat["end"]))
                    if dist < min_dist:
                        min_dist = dist
                        closest_qty = int(q["value"]) if str(q["value"]).isdigit() else None
                        
            if norm_cat in breakdown and breakdown[norm_cat] is not None:
                pass 
            else:
                breakdown[norm_cat] = closest_qty
                
    return breakdown


class ActionSetLanguage(Action):
    def name(self):
        return "action_set_language"

    def run(self, dispatcher, tracker, domain):
        lang = tracker.get_slot("language") or "en"
        lang_label = LANG_MAP.get(lang, "english").title()
        dispatcher.utter_message(
            text=t(tracker, f"Language set to {lang_label}. Now please select a museum:"),
            buttons=[
                {"title": "🔬 Visvesvaraya Museum", "payload": '/select_museum{"museum_name": "visvesvaraya"}'},
                {"title": "✈️ HAL Aerospace Museum", "payload": '/select_museum{"museum_name": "hal-aerospace"}'},
                {"title": "🧪 Science Gallery Bengaluru", "payload": '/select_museum{"museum_name": "science-gallery"}'}
            ]
        )
        return [SlotSet("language", lang)]


class ActionSetMuseum(Action):
    def name(self):
        return "action_set_museum"

    def run(self, dispatcher, tracker, domain):
        museum_id = None

        # Try slot first
        raw = tracker.get_slot("selected_museum")
        if raw:
            museum_id = resolve_museum_id(raw)

        # Try entity extraction
        if not museum_id:
            entities = tracker.latest_message.get("entities", [])
            for e in entities:
                if e["entity"] == "museum_name":
                    museum_id = resolve_museum_id(e["value"])
                    if museum_id:
                        break

        # Try resolving from the full message text as last resort
        if not museum_id:
            text = tracker.latest_message.get("text", "")
            museum_id = resolve_museum_id(text)

        museum = get_all_museums().get(museum_id) if museum_id else None
        if museum:
            dispatcher.utter_message(
                text=t(tracker, f"You've selected {museum['shortName']}! Location: {museum.get('contact', {}).get('address', '')}. What would you like to do?"),
                buttons=[
                    {"title": "🎫 Book Tickets", "payload": "/book_tickets"},
                    {"title": "ℹ️ Museum Info", "payload": "/museum_info"},
                    {"title": "❓ FAQs", "payload": "/ask_faq"},
                    {"title": "📞 Contact", "payload": "/ask_contact"},
                    {"title": "🔄 Change Museum", "payload": "/change_museum"}
                ]
            )
            return [SlotSet("selected_museum", museum_id)]
        else:
            dispatcher.utter_message(
                text=t(tracker, "I couldn't identify that museum. Please select from the list:"),
                buttons=[
                    {"title": "🔬 Visvesvaraya Museum", "payload": '/select_museum{"museum_name": "visvesvaraya"}'},
                    {"title": "✈️ HAL Aerospace Museum", "payload": '/select_museum{"museum_name": "hal-aerospace"}'},
                    {"title": "🧪 Science Gallery Bengaluru", "payload": '/select_museum{"museum_name": "science-gallery"}'}
                ]
            )
            return []


class ActionStartBooking(Action):
    def name(self):
        return "action_start_booking"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        if not museum:
            dispatcher.utter_message(text=t(tracker, "Please select a museum first!"))
            return []

        events = []
        
        # Extract early breakdown if user typed everything in one sentence
        entities = tracker.latest_message.get("entities", [])
        breakdown = extract_breakdown_from_entities(entities, museum)
        
        # Capture raw quantity if present (e.g. "3 tickets")
        qty_entity = next((e["value"] for e in entities if e["entity"] == "quantity"), None)
        if qty_entity:
            events.append(SlotSet("booking_quantity", str(qty_entity)))

        if breakdown:
            events.append(SlotSet("booking_category", json.dumps(breakdown)))
            # If all quantities are filled, we can also update booking_quantity
            if all(v is not None for v in breakdown.values()):
                events.append(SlotSet("booking_quantity", str(sum(breakdown.values()))))

        # If date is already provided, skip asking and process it
        if tracker.get_slot("booking_date") or any(e["entity"] == "date" for e in entities):
            events.append(FollowupAction("action_process_date"))
            return events

        dispatcher.utter_message(
            text=t(tracker, f"Let's book tickets for {museum['shortName']}! Please enter your preferred visit date. Format: YYYY-MM-DD (e.g., 2026-03-28). Date must be today or within the next 30 days."),
            custom={"type": "date_input"}
        )
        return events


class ActionProcessDate(Action):
    def name(self):
        return "action_process_date"

    def run(self, dispatcher, tracker, domain):
        date_str = tracker.get_slot("booking_date")
        if not date_str:
            entities = tracker.latest_message.get("entities", [])
            for e in entities:
                if e["entity"] == "date":
                    date_str = e["value"]
                    break

        if not date_str:
            text = tracker.latest_message.get("text", "")
            import re
            match = re.search(r"\d{4}-\d{2}-\d{2}", text)
            if match:
                date_str = match.group()

        if not date_str:
            dispatcher.utter_message(text=t(tracker, "Please enter a valid date in YYYY-MM-DD format (or type 'today' / 'tomorrow')."))
            return []

        # Parse natural language "today" and "tomorrow"
        if date_str.lower() == "today":
            date_str = datetime.now().strftime("%Y-%m-%d")
        elif date_str.lower() == "tomorrow":
            date_str = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")

        try:
            visit_date = datetime.strptime(date_str, "%Y-%m-%d")
            today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            max_date = today + timedelta(days=30)

            if visit_date < today:
                dispatcher.utter_message(text=t(tracker, "Date cannot be in the past. Please enter a future date."))
                return [SlotSet("booking_date", None)]

            if visit_date > max_date:
                dispatcher.utter_message(text=t(tracker, f"Date must be within 30 days from today. Please try again."))
                return [SlotSet("booking_date", None)]

            # Check if time_slot is already provided, if so skip showing buttons
            time_slot_entity_present = any(e["entity"] == "time_slot" for e in tracker.latest_message.get("entities", []))
            
            if tracker.get_slot("booking_time_slot") or time_slot_entity_present:
                dispatcher.utter_message(text=t(tracker, f"Date selected: {date_str}"))
                return [SlotSet("booking_date", date_str), FollowupAction("action_set_time_slot")]
                
            # Otherwise, show time slots
            dispatcher.utter_message(text=t(tracker, f"Date selected: {date_str}"))
            return [SlotSet("booking_date", date_str), FollowupAction("action_show_time_slots")]

        except ValueError:
            dispatcher.utter_message(text=t(tracker, "Invalid date format. Please use YYYY-MM-DD."))
            return [SlotSet("booking_date", None)]


class ActionShowTimeSlots(Action):
    def name(self):
        return "action_show_time_slots"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        time_slots = museum.get("timeSlots", []) if museum else []
        if not time_slots:
            time_slots = [{"time": "10:00 AM - 11:30 AM"}, {"time": "11:30 AM - 1:00 PM"}, {"time": "1:00 PM - 2:30 PM"}, {"time": "2:30 PM - 4:00 PM"}, {"time": "4:00 PM - 5:30 PM"}, {"time": "5:30 PM - 7:00 PM"}]

        buttons = []
        for i, slot in enumerate(time_slots):
            slot_time = slot.get("time", slot)
            buttons.append({
                "title": f"{i+1}️⃣ {slot_time}",
                "payload": f'/select_time_slot{{"time_slot": "{slot_time}"}}'
            })

        dispatcher.utter_message(
            text=t(tracker, "Please select a time slot:"),
            buttons=buttons
        )
        return []


class ActionSetTimeSlot(Action):
    def name(self):
        return "action_set_time_slot"

    def run(self, dispatcher, tracker, domain):
        slot = tracker.get_slot("booking_time_slot")
        if not slot:
            entities = tracker.latest_message.get("entities", [])
            for e in entities:
                if e["entity"] == "time_slot":
                    slot = e["value"]
                    break

        museum = get_museum(tracker)
        time_slots = museum.get("timeSlots", []) if museum else []
        if not time_slots:
             time_slots = [{"time": "10:00 AM - 11:30 AM"}, {"time": "11:30 AM - 1:00 PM"}, {"time": "1:00 PM - 2:30 PM"}, {"time": "2:30 PM - 4:00 PM"}, {"time": "4:00 PM - 5:30 PM"}, {"time": "5:30 PM - 7:00 PM"}]

        # Handle slot number input
        if slot and str(slot).isdigit(): # Ensure slot is a string digit before converting
            idx = int(slot) - 1
            if 0 <= idx < len(time_slots):
                slot = time_slots[idx].get("time", time_slots[idx])

        if slot:
            # Check if category is already provided
            category_entity_present = any(e["entity"] == "ticket_category" for e in tracker.latest_message.get("entities", []))
            
            if tracker.get_slot("booking_category") or category_entity_present:
                dispatcher.utter_message(text=t(tracker, f"Time slot: {slot}"))
                return [SlotSet("booking_time_slot", slot), FollowupAction("action_set_category")]
                
            # Otherwise show categories
            dispatcher.utter_message(text=t(tracker, f"Time slot: {slot}"))
            return [SlotSet("booking_time_slot", slot), FollowupAction("action_show_categories")]
        else:
            dispatcher.utter_message(text=t(tracker, "Please select a valid time slot."))
            return []


class ActionShowCategories(Action):
    def name(self):
        return "action_show_categories"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        categories = museum.get("ticketCategories", []) if museum else []
        if not categories:
            categories = [{"name": "Adult", "price": 300}, {"name": "Child", "price": 100}, {"name": "Senior Citizen", "price": 150}, {"name": "Student", "price": 150}, {"name": "Foreign National", "price": 650}]

        buttons = []
        for i, cat in enumerate(categories):
            buttons.append({
                "title": f"{cat['name']} - ₹{cat['price']}",
                "payload": f'/select_category{{"ticket_category": "{cat["name"]}"}}'
            })

        dispatcher.utter_message(
            text=t(tracker, "Select ticket category:"),
            buttons=buttons
        )
        return []


class ActionSetCategory(Action):
    def name(self):
        return "action_set_category"

    def run(self, dispatcher, tracker, domain):
        # We will use booking_category slot to store a JSON string of {"CategoryName": quantity, ...}
        # If quantity is not yet known, it will be None: {"CategoryName": None}
        
        entities = tracker.latest_message.get("entities", [])
        category_entities = [e for e in entities if e["entity"] == "ticket_category"]
        
        breakdown = {}
        
        museum = get_museum(tracker)
        existing_cat = tracker.get_slot("booking_category")
        if existing_cat:
            try:
                breakdown = json.loads(existing_cat)
            except json.JSONDecodeError:
                norm = normalize_category(existing_cat, museum)
                if norm:
                    breakdown = {norm: None}

        # If there are new category entities in the message, rebuild the breakdown
        if category_entities:
            # Only completely replace if the user typed entirely new categories,
            # otherwise merge or use the global extractor
            new_breakdown = extract_breakdown_from_entities(entities, museum)
            if new_breakdown:
                breakdown.update(new_breakdown)

        if not breakdown:
            dispatcher.utter_message(text=t(tracker, "Please select a valid category."))
            return []

        # Check if any category is missing a quantity
        missing_qty = any(v is None for v in breakdown.values())
        
        categories = museum.get("ticketCategories", []) if museum else []
        if not categories:
            categories = [{"name": "Adult", "price": 300}, {"name": "Child", "price": 100}, {"name": "Senior Citizen", "price": 150}, {"name": "Student", "price": 150}, {"name": "Foreign National", "price": 650}]

        if not missing_qty:
            # All categories have quantities! Format a nice message
            parts = []
            for k, v in breakdown.items():
                price = next((c["price"] for c in categories if c["name"] == k), 300)
                parts.append(f"{v}x {k} (₹{price})")
            
            dispatcher.utter_message(text=t(tracker, f"Tickets: {', '.join(parts)}"))
            
            # Since quantities are filled, calculate total quantity to satisfy the quantity slot
            total_qty = sum(breakdown.values())
            
            return [
                SlotSet("booking_category", json.dumps(breakdown)),
                SlotSet("booking_quantity", str(total_qty)),
                FollowupAction("action_ask_booking_contact")
            ]
        else:
            # Not all have quantities. Ask for quantity for the first missing one.
            missing_cat = next(k for k, v in breakdown.items() if v is None)
            price = next((c["price"] for c in categories if c["name"] == missing_cat), 300)
            
            dispatcher.utter_message(
                text=t(tracker, f"Category: {missing_cat} (Rs.{price}/ticket). How many {missing_cat} tickets do you need? (1-10)"),
                buttons=[{"title": str(i), "payload": f'/select_quantity{{"quantity": "{i}"}}'} for i in range(1, 6)]
            )
            return [SlotSet("booking_category", json.dumps(breakdown))]


class ActionSetQuantity(Action):
    def name(self):
        return "action_set_quantity"

    def run(self, dispatcher, tracker, domain):
        entities = tracker.latest_message.get("entities", [])
        qty_entities = [e["value"] for e in entities if e["entity"] == "quantity"]
        
        quantity = None
        
        text = tracker.latest_message.get("text", "").strip()
        # Guard: If text matches an email pattern, skip quantity processing
        email_pattern = r'\b[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\b'
        if re.search(email_pattern, text):
            return []
            
        if re.match(r'^\d{10}$', text):
            return [FollowupAction("action_set_mobile")]
            
        if qty_entities and str(qty_entities[0]).isdigit():
            quantity = int(qty_entities[0])
            
        if not quantity:
            text = tracker.latest_message.get("text", "").strip()
            if text.isdigit():
                quantity = int(text)

        if not quantity or not (1 <= quantity <= 10):
            dispatcher.utter_message(text=t(tracker, "Please enter a valid number of tickets (1-10)."))
            return []

        # Update the breakdown
        existing_cat = tracker.get_slot("booking_category")
        breakdown = {}
        if existing_cat:
            try:
                breakdown = json.loads(existing_cat)
            except json.JSONDecodeError:
                pass
                
        # Find the first category missing a quantity and assign it
        updated = False
        for k, v in breakdown.items():
            if v is None:
                breakdown[k] = quantity
                updated = True
                break
                
        if not updated and len(breakdown) == 1:
            # If there was a default or only one category, just overwrite it
            k = list(breakdown.keys())[0]
            breakdown[k] = quantity

        total_filled_qty = sum(v for v in breakdown.values() if v is not None)
        
        try:
            expected_qty = int(tracker.get_slot("booking_quantity") or 0)
        except (ValueError, TypeError):
            expected_qty = 0

        # If we have filled some quantity but it is less than what was requested initially,
        # ask if they want to add another category.
        if expected_qty > 0 and total_filled_qty < expected_qty:
            dispatcher.utter_message(
                text=t(tracker, f"You have accounted for {total_filled_qty} tickets. You still need {expected_qty - total_filled_qty} more. Would you like to add another category?"),
                buttons=[
                    {"title": "➕ Add Another Category", "payload": "/add_more_tickets"},
                    {"title": "✅ This is enough", "payload": "/action_ask_booking_contact"}
                ]
            )
            return [
                SlotSet("booking_category", json.dumps(breakdown)),
                SlotSet("booking_quantity", str(total_filled_qty)) # Update to what we have so far
            ]

        return [
            SlotSet("booking_category", json.dumps(breakdown)),
            SlotSet("booking_quantity", str(total_filled_qty)),
            FollowupAction("action_ask_booking_contact")
        ]
class ActionAskBookingContact(Action):
    def name(self):
        return "action_ask_booking_contact"

    def run(self, dispatcher, tracker, domain):
        mobile = tracker.get_slot("booking_mobile")
        email = tracker.get_slot("booking_email")
        
        if not mobile:
            dispatcher.utter_message(text=t(tracker, "Almost done! Please provide your 10-digit mobile number for the tickets."))
            return []
            
        if not email:
            dispatcher.utter_message(text=t(tracker, "Great! Now, please provide your email address to receive your tickets."))
            return []
            
        return [FollowupAction("action_show_booking_summary")]


class ActionSetMobile(Action):
    def name(self):
        return "action_set_mobile"

    def run(self, dispatcher, tracker, domain):
        entities = tracker.latest_message.get("entities", [])
        mobile_entities = [e["value"] for e in entities if e["entity"] == "mobile_number"]
        
        mobile = None
        if mobile_entities:
            mobile = mobile_entities[0]
        else:
            import re
            text = tracker.latest_message.get("text", "")
            match = re.search(r'\b\d{10}\b', text)
            if match:
                mobile = match.group(0)

        if not mobile:
            dispatcher.utter_message(text=t(tracker, "Please enter a valid 10-digit mobile number."))
            return []
            
        return [
            SlotSet("booking_mobile", mobile),
            FollowupAction("action_ask_booking_contact")
        ]


class ActionSetEmail(Action):
    def name(self):
        return "action_set_email"

    def run(self, dispatcher, tracker, domain):
        entities = tracker.latest_message.get("entities", [])
        email_entities = [e["value"] for e in entities if e["entity"] == "email"]
        
        email = None
        if email_entities:
            email = email_entities[0]
        else:
            import re
            text = tracker.latest_message.get("text", "")
            match = re.search(r'\b[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\b', text)
            if match:
                email = match.group(0)

        if not email:
            dispatcher.utter_message(text=t(tracker, "Please enter a valid email address."))
            return []
            
        return [
            SlotSet("booking_email", email),
            FollowupAction("action_ask_booking_contact")
        ]


class ActionShowBookingSummary(Action):
    def name(self):
        return "action_show_booking_summary"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        date = tracker.get_slot("booking_date")
        time_slot = tracker.get_slot("booking_time_slot")
        category_json = tracker.get_slot("booking_category")
        
        breakdown = {}
        if category_json:
            try:
                breakdown = json.loads(category_json)
            except:
                pass

        if not museum or not date or not time_slot or not breakdown:
            dispatcher.utter_message(text=t(tracker, "Booking details incomplete. Please start over."))
            return [AllSlotsReset()]

        total_amount = 0
        total_tickets = 0
        breakdown_text = ""
        breakdown_array = []
        
        categories = museum.get("ticketCategories", []) if museum else []
        if not categories:
            categories = [{"name": "Adult", "price": 300}, {"name": "Child", "price": 100}, {"name": "Senior Citizen", "price": 150}, {"name": "Student", "price": 150}, {"name": "Foreign National", "price": 650}]

        for cat_name, qty in breakdown.items():
            if qty is None: continue
            try:
                qty_val = int(qty)
            except (ValueError, TypeError):
                continue
                
            price = 300
            for c in categories:
                if c.get("name") == cat_name:
                    price = c.get("price", 300)
                    break
            
            subtotal = price * qty_val
            total_amount += subtotal
            total_tickets += qty_val
            breakdown_text += f"• {qty_val}x {cat_name} (₹{subtotal:,})\n"
            breakdown_array.append({"category": cat_name, "quantity": qty_val, "price": price})

        summary = (
            f"📋 **Booking Summary**\n\n"
            f"🏛️ Museum: {museum.get('shortName', 'Museum')}\n"
            f"📅 Date: {date}\n"
            f"⏰ Time: {time_slot}\n"
            f"🎟️ Tickets:\n{breakdown_text}"
            f"💰 Total Amount: ₹{int(total_amount):,}\n"
            f"📱 Mobile: {tracker.get_slot('booking_mobile')}\n"
            f"📧 Email: {tracker.get_slot('booking_email')}\n\n"
            f"Would you like to proceed to payment?"
        )

        # For the frontend, pass the array of categories so it can display them
        category_label = ", ".join([f"{item['quantity']} {item['category']}" for item in breakdown_array])

        dispatcher.utter_message(
            text=t(tracker, summary),
            buttons=[
                {"title": "✅ Confirm & Pay", "payload": "/confirm_booking"},
                {"title": "➕ Add Another Category", "payload": "/add_more_tickets"},
                {"title": "❌ Cancel", "payload": "/cancel_booking"}
            ],
            custom={
                "type": "booking_summary",
                "data": {
                    "museumId": museum.get("_id", museum.get("id")),
                    "museumName": museum.get("shortName", "Museum"),
                    "date": date,
                    "timeSlot": time_slot,
                    "category": category_label,
                    "breakdown": breakdown_array,
                    "quantity": int(total_tickets),
                    "total": int(total_amount)
                }
            }
        )
        return []


class ActionConfirmPayment(Action):
    def name(self):
        return "action_confirm_payment"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        date = tracker.get_slot("booking_date")
        time_slot = tracker.get_slot("booking_time_slot")
        category_json = tracker.get_slot("booking_category")
        
        breakdown = {}
        if category_json:
            try:
                breakdown = json.loads(category_json)
            except:
                pass

        if not all([museum, date, time_slot, breakdown]):
            dispatcher.utter_message(text=t(tracker, "Booking details incomplete. Please start over."))
            return []

        total_amount = 0
        total_tickets = 0
        breakdown_array = []
        
        categories = museum.get("ticketCategories", []) if museum else []
        if not categories:
            categories = [{"name": "Adult", "price": 300}, {"name": "Child", "price": 100}, {"name": "Senior Citizen", "price": 150}, {"name": "Student", "price": 150}, {"name": "Foreign National", "price": 650}]

        for cat_name, qty in breakdown.items():
            if not qty: continue
            price = next((c["price"] for c in categories if c["name"] == cat_name), 300)
            subtotal = price * int(qty)
            total_amount += subtotal
            total_tickets += int(qty)
            breakdown_array.append({"category": cat_name, "quantity": qty, "price": price})

        category_label = ", ".join([f"{item['quantity']} {item['category']}" for item in breakdown_array])

        dispatcher.utter_message(
            text=t(tracker, "Redirecting you to payment. Please click the button below to complete your booking."),
            custom={
                "type": "redirect_payment",
                "data": {
                    "museumId": museum.get("_id", museum.get("id")),
                    "museumName": museum.get("shortName", "Museum"),
                    "date": date,
                    "timeSlot": time_slot,
                    "category": category_label,
                    "breakdown": breakdown_array,
                    "quantity": int(total_tickets),
                    "total": int(total_amount),
                    "mobile": tracker.get_slot("booking_mobile"),
                    "email": tracker.get_slot("booking_email")
                }
            }
        )
        return [AllSlotsReset()]


class ActionShowMuseumHistory(Action):
    def name(self):
        return "action_show_museum_history"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        if museum:
            history = museum.get("history", "History information not available.")
            dispatcher.utter_message(
                text=t(tracker, f"{museum.get('shortName', 'Museum')} — History: {history}"),
                buttons=[
                    {"title": "ℹ️ More Info", "payload": "/museum_info"},
                    {"title": "🎫 Book Tickets", "payload": "/book_tickets"},
                    {"title": "🔙 Menu", "payload": "/book_tickets"}
                ]
            )
        else:
            dispatcher.utter_message(text=t(tracker, "Please select a museum first."))
        return []


class ActionShowGalleries(Action):
    def name(self):
        return "action_show_galleries"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        if museum:
            galleries = museum.get("galleries", [])
            if not galleries:
                galleries_text = "Gallery information currently unavailable."
            else:
                galleries_text = "\n".join([f"🖼️ **{g.get('name', 'Gallery')}** — {g.get('description', g.get('desc', ''))}" for g in galleries])
            
            dispatcher.utter_message(
                text=t(tracker, f"{museum.get('shortName', 'Museum')} — Galleries: {galleries_text}"),
                buttons=[
                    {"title": "ℹ️ More Info", "payload": "/museum_info"},
                    {"title": "🎫 Book Tickets", "payload": "/book_tickets"},
                    {"title": "🔙 Menu", "payload": "/book_tickets"}
                ]
            )
        else:
            dispatcher.utter_message(text=t(tracker, "Please select a museum first."))
        return []


class ActionShowHours(Action):
    def name(self):
        return "action_show_hours"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        if museum:
            hours_data = museum.get("visitingHours", {})
            if isinstance(hours_data, dict):
                hours_text = f"Regular: {hours_data.get('regular', 'N/A')}, Weekend: {hours_data.get('weekend', 'N/A')}, Closed: {hours_data.get('closed', 'N/A')}"
            else:
                hours_text = str(hours_data)
                
            dispatcher.utter_message(
                text=t(tracker, f"{museum.get('shortName', 'Museum')} — Visiting Hours: {hours_text}"),
                buttons=[
                    {"title": "ℹ️ More Info", "payload": "/museum_info"},
                    {"title": "🎫 Book Tickets", "payload": "/book_tickets"}
                ]
            )
        else:
            dispatcher.utter_message(text=t(tracker, "Please select a museum first."))
        return []


class ActionShowRules(Action):
    def name(self):
        return "action_show_rules"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        if museum:
            rules = museum.get("rules", [])
            if isinstance(rules, list):
                rules_formatted = "\n".join([f"• {r}" for r in rules])
            else:
                rules_formatted = "\n".join([f"• {r}" for r in str(rules).split("\n")])
                
            dispatcher.utter_message(
                text=t(tracker, f"{museum.get('shortName', 'Museum')} — Rules and Guidelines:\n{rules_formatted}"),
                buttons=[
                    {"title": "ℹ️ More Info", "payload": "/museum_info"},
                    {"title": "🎫 Book Tickets", "payload": "/book_tickets"}
                ]
            )
        else:
            dispatcher.utter_message(text=t(tracker, "Please select a museum first."))
        return []


class ActionShowEvents(Action):
    def name(self):
        return "action_show_events"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        if museum:
            events = museum.get("events", [])
            if not events:
                events_text = "No upcoming events listed at the moment."
            else:
                events_text = "\n".join([f"🎪 **{e.get('name', 'Event')}** ({e.get('date', 'TBD')})\n   {e.get('description', e.get('desc', ''))}" for e in events])
            
            dispatcher.utter_message(
                text=t(tracker, f"{museum.get('shortName', 'Museum')} — Upcoming Events: {events_text}"),
                buttons=[
                    {"title": "ℹ️ More Info", "payload": "/museum_info"},
                    {"title": "🎫 Book Tickets", "payload": "/book_tickets"}
                ]
            )
        else:
            dispatcher.utter_message(text=t(tracker, "Please select a museum first."))
        return []


class ActionShowContact(Action):
    def name(self):
        return "action_show_contact"

    def run(self, dispatcher, tracker, domain):
        museum = get_museum(tracker)
        if museum:
            contact = museum.get("contact", {})
            address = contact.get("address", museum.get("location", "N/A"))
            phone = contact.get("phone", museum.get("phone", "N/A"))
            email = contact.get("email", museum.get("email", "N/A"))
            
            dispatcher.utter_message(
                text=t(tracker, f"{museum.get('shortName', 'Museum')} — Contact: Address: {address}, Phone: {phone}, Email: {email}"),
                buttons=[
                    {"title": "ℹ️ More Info", "payload": "/museum_info"},
                    {"title": "🎫 Book Tickets", "payload": "/book_tickets"}
                ]
            )
        else:
            dispatcher.utter_message(text=t(tracker, "Please select a museum first."))
        return []


class ActionChangeMuseum(Action):
    def name(self):
        return "action_change_museum"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(
            text=t(tracker, "Select a new museum:"),
            buttons=[
                {"title": "🔬 Visvesvaraya Museum", "payload": '/select_museum{"museum_name": "visvesvaraya"}'},
                {"title": "✈️ HAL Aerospace Museum", "payload": '/select_museum{"museum_name": "hal-aerospace"}'},
                {"title": "🧪 Science Gallery Bengaluru", "payload": '/select_museum{"museum_name": "science-gallery"}'}
            ]
        )
        return [SlotSet("selected_museum", None)]


# ============================================================
# Translated Domain Response Actions
# ============================================================

class ActionGreet(Action):
    def name(self):
        return "action_greet"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(
            text="🇮🇳 Welcome to MuseumPass Bangalore!\n\nI'm your AI-powered ticket booking assistant for Bangalore's finest museums.\n\nPlease select your language:",
            buttons=[
                {"title": "English", "payload": '/select_language{"language": "en"}'},
                {"title": "हिंदी", "payload": '/select_language{"language": "hi"}'},
                {"title": "ಕನ್ನಡ", "payload": '/select_language{"language": "kn"}'},
                {"title": "தமிழ்", "payload": '/select_language{"language": "ta"}'},
                {"title": "తెలుగు", "payload": '/select_language{"language": "te"}'},
                {"title": "বাংলা", "payload": '/select_language{"language": "bn"}'},
                {"title": "मराठी", "payload": '/select_language{"language": "mr"}'},
                {"title": "ગુજરાતી", "payload": '/select_language{"language": "gu"}'},
                {"title": "മലയാളം", "payload": '/select_language{"language": "ml"}'},
                {"title": "ਪੰਜਾਬੀ", "payload": '/select_language{"language": "pa"}'},
                {"title": "ଓଡ଼ିଆ", "payload": '/select_language{"language": "or"}'},
                {"title": "অসমীয়া", "payload": '/select_language{"language": "as"}'},
                {"title": "اردو", "payload": '/select_language{"language": "ur"}'}
            ]
        )
        return []


class ActionGoodbye(Action):
    def name(self):
        return "action_goodbye"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(text=t(tracker, "Thank you for using MuseumPass Bangalore! Have a wonderful day!"))
        return []


class ActionThank(Action):
    def name(self):
        return "action_thank"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(
            text=t(tracker, "You're welcome! Is there anything else I can help you with?"),
            buttons=[
                {"title": "🎫 Book Tickets", "payload": "/book_tickets"},
                {"title": "ℹ️ Museum Info", "payload": "/museum_info"},
                {"title": "👋 Goodbye", "payload": "/goodbye"}
            ]
        )
        return []


class ActionMainMenu(Action):
    def name(self):
        return "action_main_menu"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(
            text=t(tracker, "What would you like to do?"),
            buttons=[
                {"title": "🎫 Book Tickets", "payload": "/book_tickets"},
                {"title": "ℹ️ Museum Info", "payload": "/museum_info"},
                {"title": "❓ FAQs", "payload": "/ask_faq"},
                {"title": "📞 Contact", "payload": "/ask_contact"},
                {"title": "🔄 Change Museum", "payload": "/change_museum"}
            ]
        )
        return []


class ActionBookingCancelled(Action):
    def name(self):
        return "action_booking_cancelled"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(text=t(tracker, "Booking cancelled. Feel free to start again anytime!"))
        return []


class ActionInfoMenu(Action):
    def name(self):
        return "action_info_menu"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(
            text=t(tracker, "What would you like to know about this museum?"),
            buttons=[
                {"title": "🏛️ History", "payload": "/ask_history"},
                {"title": "🖼️ Galleries", "payload": "/ask_galleries"},
                {"title": "🕐 Hours", "payload": "/ask_hours"},
                {"title": "📋 Rules", "payload": "/ask_rules"},
                {"title": "🎪 Events", "payload": "/ask_events"},
                {"title": "📍 Contact", "payload": "/ask_contact"},
                {"title": "🔙 Back", "payload": "/book_tickets"}
            ]
        )
        return []


class ActionFaqMenu(Action):
    def name(self):
        return "action_faq_menu"

    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(
            text=t(tracker, "Frequently Asked Questions:"),
            buttons=[
                {"title": "❌ Cancel Booking?", "payload": "/faq_cancel"},
                {"title": "🅿️ Parking?", "payload": "/faq_parking"},
                {"title": "♿ Wheelchair?", "payload": "/faq_wheelchair"},
                {"title": "☕ Cafe?", "payload": "/faq_cafe"},
                {"title": "🗣️ Guided Tour?", "payload": "/faq_guided_tour"},
                {"title": "🔙 Back", "payload": "/book_tickets"}
            ]
        )
        return []


class ActionFaqCancel(Action):
    def name(self):
        return "action_faq_cancel"
    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(text=t(tracker, "Yes! You can cancel your booking up to 24 hours before the visit for a full refund. Cancellations within 24 hours will incur a 20% fee."))
        return []

class ActionFaqParking(Action):
    def name(self):
        return "action_faq_parking"
    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(text=t(tracker, "Yes, most museums in Bangalore have parking facilities for both cars and two-wheelers."))
        return []

class ActionFaqWheelchair(Action):
    def name(self):
        return "action_faq_wheelchair"
    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(text=t(tracker, "Absolutely! Wheelchairs are available free of charge at the entrance of most museums. The museums are accessible with ramps and elevators."))
        return []

class ActionFaqCafe(Action):
    def name(self):
        return "action_faq_cafe"
    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(text=t(tracker, "Yes, most museums have a cafe or canteen offering snacks, beverages, and light meals during museum hours."))
        return []

class ActionFaqGuidedTour(Action):
    def name(self):
        return "action_faq_guided_tour"
    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(text=t(tracker, "Yes! Guided tours are available at most museums in multiple languages. Check with the specific museum for schedules and pricing."))
        return []

class ActionDefaultFallback(Action):
    def name(self):
        return "action_default_fallback"
    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message(
            text=t(tracker, "I'm not sure I understand. Could you rephrase or choose from the options?"),
            buttons=[
                {"title": "🎫 Book Tickets", "payload": "/book_tickets"},
                {"title": "ℹ️ Museum Info", "payload": "/museum_info"},
                {"title": "❓ FAQs", "payload": "/ask_faq"}
            ]
        )
        return []

