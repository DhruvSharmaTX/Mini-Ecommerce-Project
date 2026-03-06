import uuid
def generate_id(prefix: str):
    unique_id = uuid.uuid4().hex[:8].upper()
    return f"{prefix}_{unique_id}"