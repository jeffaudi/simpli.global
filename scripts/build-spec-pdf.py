#!/usr/bin/env python3
"""
Generate the archived, numbered Simpli specification PDF.

Input:
  - spec/SIMPLI-SPECIFICATION.md
Output:
  - public/spec/simpli-specification-v0.1.pdf

Requires reportlab (`pip install reportlab`). DejaVu fonts are bundled under
scripts/fonts/dejavu/ (with fallbacks to system or matplotlib paths).
"""

from __future__ import annotations

import re
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import PageBreak, Paragraph, Preformatted, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
SRC_MD = ROOT / "spec" / "SIMPLI-SPECIFICATION.md"
OUT_PDF = ROOT / "public" / "spec" / "simpli-specification-v0.1.pdf"
BUNDLED_DEJAVU = ROOT / "scripts" / "fonts" / "dejavu"

REQUIRED_FONTS = (
  "DejaVuSans.ttf",
  "DejaVuSans-Bold.ttf",
  "DejaVuSansMono.ttf",
  "DejaVuSansMono-Bold.ttf",
)


def find_dejavu_dir() -> Path:
  candidates: list[Path] = [
    BUNDLED_DEJAVU,
    Path("/usr/share/fonts/truetype/dejavu"),
    Path("/usr/local/share/fonts/dejavu"),
    Path("/opt/homebrew/share/fonts/dejavu"),
  ]
  try:
    import matplotlib

    candidates.append(
      Path(matplotlib.get_data_path()) / "mpl-data" / "fonts" / "ttf"
    )
  except ImportError:
    pass

  for directory in candidates:
    if all((directory / name).is_file() for name in REQUIRED_FONTS):
      return directory

  searched = "\n".join(f"  - {path}" for path in candidates)
  raise SystemExit(
    "DejaVu fonts not found. Need DejaVuSans + DejaVuSansMono (regular and bold).\n"
    f"Searched:\n{searched}\n"
    "Bundled copies should live in scripts/fonts/dejavu/ (see that folder’s README)."
  )


def md_inline_to_html(s: str) -> str:
  # Very small subset: **bold**, *italic*, `code`
  s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
  # ReportLab's paragraph parser expects literal quotes in attributes.
  s = re.sub(r"`([^`]+)`", r'<font face="DejaVuSansMono">\1</font>', s)
  s = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", s)
  # Avoid bold consuming italic markers; keep simple and non-greedy
  s = re.sub(r"\*([^*]+)\*", r"<i>\1</i>", s)
  return s


def build() -> None:
  if not SRC_MD.exists():
    raise SystemExit(f"Missing source: {SRC_MD}")

  OUT_PDF.parent.mkdir(parents=True, exist_ok=True)
  dejavu_dir = find_dejavu_dir()

  # Use a Unicode font so IPA and other phonetic characters render.
  # (Helvetica/Courier are limited and will show missing-glyph squares.)
  pdfmetrics.registerFont(TTFont("DejaVuSans", str(dejavu_dir / "DejaVuSans.ttf")))
  pdfmetrics.registerFont(TTFont("DejaVuSans-Bold", str(dejavu_dir / "DejaVuSans-Bold.ttf")))
  pdfmetrics.registerFont(TTFont("DejaVuSansMono", str(dejavu_dir / "DejaVuSansMono.ttf")))
  pdfmetrics.registerFont(TTFont("DejaVuSansMono-Bold", str(dejavu_dir / "DejaVuSansMono-Bold.ttf")))

  styles = getSampleStyleSheet()
  normal = ParagraphStyle(
    "SimpliNormal",
    parent=styles["Normal"],
    fontName="DejaVuSans",
    fontSize=10.5,
    leading=14,
    spaceAfter=6,
  )
  h1 = ParagraphStyle(
    "SimpliH1",
    parent=styles["Heading1"],
    fontName="DejaVuSans-Bold",
    fontSize=18,
    leading=22,
    spaceAfter=10,
  )
  h2 = ParagraphStyle(
    "SimpliH2",
    parent=styles["Heading2"],
    fontName="DejaVuSans-Bold",
    fontSize=13,
    leading=17,
    spaceBefore=10,
    spaceAfter=6,
  )
  h3 = ParagraphStyle(
    "SimpliH3",
    parent=styles["Heading3"],
    fontName="DejaVuSans-Bold",
    fontSize=11,
    leading=14,
    spaceBefore=8,
    spaceAfter=4,
  )
  mono = ParagraphStyle(
    "SimpliMono",
    parent=styles["Code"],
    fontName="DejaVuSansMono",
    fontSize=9.5,
    leading=12,
    spaceAfter=6,
  )

  doc = SimpleDocTemplate(
    str(OUT_PDF),
    pagesize=A4,
    leftMargin=18 * mm,
    rightMargin=18 * mm,
    topMargin=18 * mm,
    bottomMargin=18 * mm,
    title="Simpli Language Specification v0.1",
    author="simpli.global",
  )

  md = SRC_MD.read_text(encoding="utf-8").splitlines()

  story = []
  in_code = False
  code_lines: list[str] = []

  def flush_code() -> None:
    nonlocal code_lines
    if code_lines:
      story.append(Preformatted("\n".join(code_lines), style=mono))
      code_lines = []

  for raw in md:
    line = raw.rstrip("\n")

    if line.strip().startswith("```"):
      if in_code:
        in_code = False
        flush_code()
      else:
        in_code = True
      continue

    if in_code:
      code_lines.append(line)
      continue

    if line.strip() == "":
      story.append(Spacer(1, 6))
      continue

    if line.startswith("# "):
      flush_code()
      story.append(Paragraph(md_inline_to_html(line[2:].strip()), style=h1))
      continue

    if line.startswith("## "):
      flush_code()
      story.append(Paragraph(md_inline_to_html(line[3:].strip()), style=h2))
      continue

    if line.startswith("### "):
      flush_code()
      story.append(Paragraph(md_inline_to_html(line[4:].strip()), style=h3))
      continue

    if line.strip() == "---":
      flush_code()
      story.append(PageBreak())
      continue

    # Bullets: keep as plain text with a leading dot, simplest + robust.
    if re.match(r"^\s*[-*]\s+", line):
      txt = re.sub(r"^\s*[-*]\s+", "• ", line)
      story.append(Paragraph(md_inline_to_html(txt), style=normal))
      continue

    story.append(Paragraph(md_inline_to_html(line), style=normal))

  flush_code()
  doc.build(story)
  print(f"Wrote {OUT_PDF}")


if __name__ == "__main__":
  build()

