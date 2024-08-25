from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import re
import logging

# Configuração do logging
logging.basicConfig(level=logging.DEBUG)  # Define o nível de logging para DEBUG
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        logger.error('No file part')
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        logger.error('No selected file')
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        logger.info('Processing file: %s', file.filename)
        
        # Lê o conteúdo do PDF
        text = extract_text_from_pdf(file)
        logger.debug('Extracted text: %s', text[:500])  # Log a preview of the extracted text

        # Extrai números do texto
        numbers = extract_numbers_from_text(text)
        logger.debug('Extracted numbers: %s', numbers)  # Log the extracted numbers

        # Junta todos os números em uma única string
        combined_numbers = ''.join(numbers)
        logger.debug('Combined numbers string: %s', combined_numbers)

        # Divide a string em grupos de 5 caracteres
        grouped_numbers = [combined_numbers[i:i+5] for i in range(0, len(combined_numbers), 5)]
        logger.debug('Grouped numbers: %s', grouped_numbers)

        return jsonify({'registers': grouped_numbers}), 200
    
    logger.error('Invalid file type')
    return jsonify({'error': 'Invalid file type'}), 400

def extract_text_from_pdf(file):
    text = ""
    pdf_reader = PyPDF2.PdfReader(file)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def extract_numbers_from_text(text):
    # Regex para encontrar números
    return re.findall(r'\d+', text)

if __name__ == '__main__':
    app.run(debug=True)
