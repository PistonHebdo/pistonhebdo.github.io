# Note to self: this is all vibe coded, I'm sorry :( (gotta change laterzz ig)

import os
import json

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__)) # ./scripts/
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..")) # ./
PDF_DIR = os.path.join(PROJECT_ROOT, "archives") # ./archives/
OUTPUT_JSON = os.path.join(SCRIPT_DIR, "pdfs.json") # ./scripts/pdfs.json

def is_pdf(filename: str) -> bool:
    return filename.lower().endswith(".pdf")

def build_pdf_list(pdf_root: str):
    pdf_items = []

    # Walk through ./pdfs
    for dirpath, dirnames, filenames in os.walk(pdf_root):
        # Relative path from pdf_root
        rel_dir = os.path.relpath(dirpath, pdf_root)

        # Try to infer year from immediate subfolder name
        # e.g. ./pdfs/2024/report-q1.pdf -> year = 2024
        parts = rel_dir.split(os.sep)
        year = None
        for part in parts:
            if part.isdigit() and len(part) == 4:
                year = int(part)
                break

        for name in filenames:
            if not is_pdf(name):
                continue

            rel_path = os.path.join(rel_dir, name) if rel_dir != "." else name

            # Default label: file name without path
            label = os.path.splitext(name)[0].replace("_", " ").replace("-", " ").title()

            # Fallback if no year detected: use 0 or a special value
            item = {
                "year": year if year is not None else 0,
                "file": rel_path.replace("\\", "/"),  # normalize for web
                "label": label,
            }
            pdf_items.append(item)

    # Optionally sort by year, then label
    pdf_items.sort(key=lambda x: (-(x["year"] or 0), x["label"]))
    return pdf_items

def main():
    if not os.path.isdir(PDF_DIR):
        raise SystemExit(f"PDF folder not found: {PDF_DIR}")

    pdf_list = build_pdf_list(PDF_DIR)

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(pdf_list, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(pdf_list)} entries to {OUTPUT_JSON}")

if __name__ == "__main__":
    main()