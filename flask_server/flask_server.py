# flask_ser.py

import numpy as np
import tensorflow as tf
from gensim.models import Word2Vec
from flask import Flask, request, jsonify

load = tf.keras.models.load_model('model_simple_layers.h5')
model = Word2Vec.load('model_for_rec.model')

app = Flask(__name__)

@app.route('/evaluation', methods=['POST'])
def evaluation():
    input_data = request.json
    model_input = np.array([input_data])
    return str(np.argmax(load.predict(model_input)))

@app.route('/recommendation', methods=['POST']) 
def recommendation():
    return jsonify(model.wv.most_similar(positive=request.json["correct"], negative=request.json["wrong"]))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, threaded=False)
