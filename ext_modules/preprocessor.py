<<<<<<< HEAD:ext_modules/preprocessor.py
from ext_modules.reader import base64_to_dataframe
from ext_modules.validator import validate_data
=======
from modules.reader import base64_to_dataframe
from modules.validator import validate_data
>>>>>>> ec8da41 (Refactored modules path to root):modules/preprocessor.py


def preprocess_data(b64_data):
    """Decodes, converts and validates input data"""
    data = base64_to_dataframe(b64_data)
    validate_data(data)
    return data