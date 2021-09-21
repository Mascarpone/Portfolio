import pathlib
import shutil

import yaml
from jinja2 import Environment, PackageLoader, select_autoescape


class Data:
    def __init__(self, data_filepath):
        self.doc = {}
        with open(data_filepath, "r") as documents:
            for data in yaml.safe_load_all(documents):
                self.doc[data["document"]] = data

    def get_introduction(self):
        return self.doc["introduction"]

    def get_contacts(self):
        return self.doc["introduction"].get("contacts")

    def get_konami(self):
        return self.doc["introduction"].get("konami")

    def get_jobs(self):
        return self.doc["career"]["jobs"]

    def get_diploma(self):
        return self.doc["schools"]["diploma"]

    def get_schools(self):
        return self.doc["schools"]["schools"]

    def get_grades_documents(self):
        return (g["gradesfile"] for s in self.get_schools() for g in s["grades"])

    def get_projects(self):
        return self.doc["projects"]["projects"]

    def get_interests(self):
        return self.doc["interests"]

    def get_document(self, docname):
        return self.doc.get(docname)


def build_static_website(data, src, dst):
    vars = {
        "konami": data.get_konami(),
        "introduction": data.get_introduction(),
        "contacts": data.get_contacts(),
        "jobs": data.get_jobs(),
        "interests": data.get_interests(),
        "diploma": data.get_diploma(),
        "schools": data.get_schools(),
        "projects": data.get_projects(),
    }

    env = Environment(loader=PackageLoader(src), autoescape=select_autoescape())
    env.get_template("index.html").stream(**vars).dump(f"{dst}/index.html")
    env.get_template("career.html").stream(**vars).dump(f"{dst}/career.html")
    env.get_template("interests.html").stream(**vars).dump(f"{dst}/interests.html")
    env.get_template("education.html").stream(**vars).dump(f"{dst}/education.html")
    env.get_template("grades.html").stream().dump(f"{dst}/grades.html")
    for gradesdoc in data.get_grades_documents():
        env.get_template("grades.html").stream(
            **vars,
            grades=data.get_document(gradesdoc),
        ).dump(f"{dst}/grades-{gradesdoc}.html")


if __name__ == "__main__":
    src_path = pathlib.Path("website")
    target_path = pathlib.Path("target")

    if target_path.exists() and target_path.is_dir():
        shutil.rmtree(target_path)

    shutil.copytree(src_path / "static", target_path / "static", dirs_exist_ok=True)

    data = Data("data.yml")
    build_static_website(data, str(src_path), str(target_path))
