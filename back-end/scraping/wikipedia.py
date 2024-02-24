import requests
import wikipediaapi

wiki = wikipediaapi.Wikipedia('TexasHomesProject (ananth.s.kothuri@gmail.com)', 'en')


def search_page(title, section_title):
    assert title != ""
    page = wiki.page(title)
    if not page.exists:
        raise ValueError(f"title \"{title}\" could not be found in Wikipedia")
    
    section = page.section_by_title(section_title)
    text = section.text
    if text == "":
        text = page.sections[0].text
    
    return {
        "website_url" : page.fullurl,
        "summary" : page.summary,
        "first_section": text
    }

def get_media_for_page(title):
    assert title != ""
    response = requests.get(f'https://en.wikipedia.org/api/rest_v1/page/media-list/{title}')
    assert response != None
    return response.json()