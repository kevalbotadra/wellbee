import collections
import json
import os
import random
import string

import flask
import nltk
import openai
from flask import Flask
from nltk import tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.stem.porter import PorterStemmer
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer

from gpt import ask

nltk.download('stopwords')
nltk.download('punkt')

app = Flask(__name__)

def process_text(text, stem=True):
    texts = text.translate(str.maketrans('','',string.punctuation))
    tokens = word_tokenize(texts)

    if not stem:
        return tokens
    else:
        stemmer = PorterStemmer()
        tokens = [stemmer.stem(t) for t in tokens]

def cluster_texts(texts, clusters):
    print(texts)
    vectorizer = TfidfVectorizer(stop_words=stopwords.words('english'))
    tfidf = vectorizer.fit_transform(texts)
    print(tfidf)
    kmeans_model = KMeans(n_clusters=clusters)
    kmeans_model.fit(tfidf)

    clustering = collections.defaultdict(list)

    for index, label in enumerate(kmeans_model.labels_):
        clustering[label].append(index)

    return clustering

    
@app.route("/")
def index():
    return 'Hello World!'

@app.route("/gpt3", methods=["POST"])
def gpt3_responses():
    request_json = flask.request.json
    secret = request_json["secret"]

    if secret != "CONGPilDnoMinEThonYAnkoLViTypOlmStOd":
        return {"code": 401, "error": "Unauthorized"}

    user_inputs = request_json["inputs"]
    bot_outputs = ["outputs"]

    if len(user_inputs) > 1:
        before = user_inputs[:-1]
        current = user_inputs[-1]
        chatlog = """Human: Hey, I am looking for some advice. Any chance you can help?
AI: Yes, I can definitely help you. What's on your mind? 
"""         

        print(before)

        i = 0
        for question in before:
            i += 1
            if i != len(before):
              chatlog += f"""Human: {question}\nAI: {bot_outputs[i]}\n"""
        
        response = ask(current, chatlog)

        return {"response" : response}
        
    elif len(user_inputs) == 1:
        current = user_inputs[0]

        chatlog = """Human: Hey, I am looking for some advice. Any chance you can help?
AI: Yes, I can definitely help you. What's on your mind? 
"""  
        response = ask(current, chatlog)

        return {"response" : response}
    
    else:
        return {"code" : 401, "error" : "request missing arguments"}



# match


@app.route("/match", methods=["POST"])
def grouping():
    request_json = flask.request.json
    
    user = request_json["user"]
    all_users = request_json["all_users"]

    ids = []
    bios = []

    for user in all_users:
        for id, bio in user:
            ids.append(id)
            bios.append(bio)
    
    for id, bio in user:
        ids.append(id)
        bios.append(bio)
        to_predict = id  
    # process_text(bios)

    clusters = len(bios) / 2


    clusters  = cluster_texts(bios, int(clusters))

    clusters = dict(clusters)


    for item in clusters:
        for value in clusters[item]:
            if value == to_predict:
                to_predict_key = item
            else:
                pass

    profile_index = random.choice(clusters[to_predict_key])

    while profile_index == to_predict:
        profile_index = random.choice(clusters[to_predict_key])


    profile_id = ids[profile_index]


    return {"id" : profile_id}


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=int(os.environ.get('PORT', 8080)))
