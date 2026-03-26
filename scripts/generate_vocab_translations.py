import json
import re
import time
from pathlib import Path

import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / ".tmp-py"))
from deep_translator import MyMemoryTranslator


ROOT = Path(__file__).resolve().parents[1]
EN_PAGE = ROOT / "dist" / "en" / "vocabulary-1500" / "index.html"
OUT_FR = ROOT / "src" / "data" / "vocabulary-1500.fr.json"
OUT_ES = ROOT / "src" / "data" / "vocabulary-1500.es.json"


def parse_entries():
    html = EN_PAGE.read_text(encoding="utf-8")
    rows = re.findall(r"<tr>\s*<td><code>(.*?)</code></td>\s*<td>(.*?)</td>\s*</tr>", html)
    return [{"simpli": s, "english": e} for s, e in rows]


def translate_words(words, target):
    translator = MyMemoryTranslator(source="en-US", target=target)
    out = []
    chunk_size = 200
    for i in range(0, len(words), chunk_size):
        chunk = words[i : i + chunk_size]
        try:
            translated = translator.translate_batch(chunk)
        except Exception:
            time.sleep(0.5)
            translated = translator.translate_batch(chunk)
        out.extend(translated)
        print(f"[{target}] translated {min(i + chunk_size, len(words))}/{len(words)}", flush=True)
        time.sleep(0.05)
    return out


def main():
    entries = parse_entries()
    english = [e["english"] for e in entries]

    fr = translate_words(english, "fr-FR")
    es = translate_words(english, "es-ES")

    fr_entries = [{"simpli": e["simpli"], "translation": t} for e, t in zip(entries, fr)]
    es_entries = [{"simpli": e["simpli"], "translation": t} for e, t in zip(entries, es)]

    OUT_FR.write_text(json.dumps(fr_entries, ensure_ascii=False, indent=2), encoding="utf-8")
    OUT_ES.write_text(json.dumps(es_entries, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Generated {len(fr_entries)} FR entries and {len(es_entries)} ES entries.")


if __name__ == "__main__":
    main()
