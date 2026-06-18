# DejaVu fonts (PDF build)

Bundled **DejaVu Sans** and **DejaVu Sans Mono** (Bitstream Vera / DejaVu license) for `scripts/build-spec-pdf.py`. ReportLab needs Unicode-capable fonts so IPA and phonetic symbols render in the archived specification PDF.

The build script checks this folder first, then common system paths (Debian `/usr/share/fonts/truetype/dejavu`, Homebrew, etc.).
