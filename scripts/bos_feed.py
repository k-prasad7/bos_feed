import requests
import xml.etree.ElementTree as ET
from datetime import datetime
import json

# Define the URL for the RSS feed
rss_feed_url = 'https://sfgov.legistar.com/Feed.ashx?M=L&ID=21742942&GUID=86444843-bd04-4e6c-bfe0-856d29f64a66&Title=City+and+County+of+San+Francisco+-+Legislation'

# Send the GET request to fetch the RSS feed
response = requests.get(rss_feed_url)
if response.status_code != 200:
    raise ValueError("Failed to retrieve RSS feed")

# Parse the XML content
root = ET.fromstring(response.content)

# Function to extract text from an XML element
def get_text(element, tag):
    return element.find(tag).text if element.find(tag) is not None else 'N/A'

# Extract data from the RSS feed
items = root.findall('.//item')
ordinances = []

for item in items:
    title = get_text(item, 'title')
    link = get_text(item, 'link')
    description = get_text(item, 'description')
    category = get_text(item, 'category')
    pub_date = get_text(item, 'pubDate')

    ordinance = {
        "File #": title,
        "Type": category,
        "Status": 'N/A',
        "Intro Date": pub_date,
        "Final Action": 'N/A',
        "Title": description.split('Title: ')[1].split('Description')[0].strip() if 'Title: ' in description else 'N/A',
        "Detail URL": link
    }
    ordinances.append(ordinance)

# Sort ordinances by publication date
ordinances_sorted = sorted(ordinances, key=lambda x: datetime.strptime(x["Intro Date"], "%a, %d %b %Y %H:%M:%S %Z"), reverse=True)


# Convert the list of ordinances to JSON
ordinances_json = json.dumps(ordinances_sorted)

# Print the JSON string (this will be the API response)
print(ordinances_json)
