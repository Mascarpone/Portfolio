import os

from website import app


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run("0.0.0.0", port=port)
