import spacy

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def split_sentences(str):
    return [sent.text for sent in nlp(str).sents]