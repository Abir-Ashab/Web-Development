import google.generativeai as gemini
import markdown
from bs4 import BeautifulSoup
import json

# Configure the Gemini API
gemini.configure(api_key='AIzaSyCnJXSTdS4w5Il9r7URapwWBAmo2UkruV4')
generative_model = gemini.GenerativeModel('gemini-1.5-flash')

# Generate itinerary content
response = generative_model.generate_content(
    "I want to go to Cox's Bazar from Dhaka. Generate an itinerary (rough time estimates, roads, restaurants, and hotels beside the journey path for passing break time). Also show me the itinerary on the map."
)

# Convert response text to Markdown format
explanation = markdown.markdown(response.text)

# Parse the Markdown content to extract itinerary details
soup = BeautifulSoup(explanation, 'html.parser')

# Extract itinerary title and days
data = {
    'itinerary_title': soup.h2.string if soup.h2 else 'No title found',
    'days': {}
}

# Iterate through each day in the itinerary
for day in soup.find_all('p', string=lambda text: text and 'Day' in text):
    day_number = day.get_text(strip=True)
    day_content = day.find_next('ul')
    
    if day_content:
        activities = []
        
        for li in day_content.find_all('li'):
            activities.append(li.get_text(strip=True))

        # Store the activities for each day
        data['days'][day_number] = activities

# Convert to JSON with nice formatting
json_data = json.dumps(data, indent=4)

# Print the JSON data
print(json_data)
