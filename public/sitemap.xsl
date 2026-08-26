<?xml version="1.0" encoding="UTF-8"?>
<!--
  Sitemap stylesheet - ism50.com

  A sitemap is XML for crawlers, but a human opens one too, and an unstyled
  sitemap greets them with "This XML file does not appear to have any style
  information associated with it." That line reads as a broken page to anybody
  who is not a developer, on a URL a reader may well click.

  THIS CHANGES NOT ONE BYTE OF WHAT A CRAWLER PARSES. The XML is untouched; a
  browser simply applies this transform when rendering it, and crawlers ignore
  xml-stylesheet entirely.

  ============================================================================
  THE HREF THAT POINTS AT THIS FILE MUST BE RELATIVE, AND IT IS NOT BY DEFAULT
  ============================================================================

  @astrojs/sitemap takes `xslURL` from astro.config.mjs and prefixes it with
  `site`, so "/sitemap.xsl" ships as "https://ism50.com/sitemap.xsl". A browser
  applying an XSLT stylesheet enforces same-origin against that ABSOLUTE href,
  so the stylesheet silently fails to apply anywhere that is not production: not
  on a Firebase preview channel, not in `astro preview`, not against the
  emulator, not on localhost. Production is the ONE origin where the absolute
  form works, which makes it the one arrangement that cannot be caught before it
  ships.

  scripts/fix-sitemap-stylesheet.mjs rewrites it back to relative after every
  build, and fails loudly if it finds no xml-stylesheet at all. ALL FIVE SITES IN
  THIS GROUP CARRY THAT FIX. Two of them shipped without it and rendered as an
  unstyled wall of text in production for as long as nobody opened the file.

  ============================================================================
  BUILT IN THIS SITE'S OWN VOCABULARY
  ============================================================================

  Cool grey ground, the ultramarine expansion accent, hairline rules, square
  corners, tabular figures, and the datum device at the head of the page. Not a
  copy of a sibling's stylesheet: this is a page people occasionally open, and a
  sitemap that looks like a different site than the site is a small lie.

  FONTS ARE A SYSTEM STACK AND NOTHING ELSE. Astro's font pipeline emits hashed
  filenames under /_astro/fonts/, so any path written into this file would break
  the next time the build changed a hash, and a stylesheet that 404s its own font
  is worse than one that never asked for it.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en-CA">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <!-- The sitemap is for machines. It should never itself be a result. -->
        <meta name="robots" content="noindex, follow"/>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        <title>Sitemap | ISM50</title>
        <style>
          :root {
            --ground: #e7eaee;
            --surface: #fbfcfd;
            --ink: #10141c;
            --soft: #4d5766;
            --faint: #7b8698;
            --rule: #c6ccd6;
            --expansion: #1f3fd0;
            --contraction: #a33a10;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --ground: #0b0e14;
              --surface: #131821;
              --ink: #e2e7ef;
              --soft: #9aa5b6;
              --faint: #6d798c;
              --rule: #262e3b;
              --expansion: #7f9dff;
              --contraction: #e2915b;
            }
          }

          * { box-sizing: border-box; }

          body {
            margin: 0;
            background: var(--ground);
            color: var(--ink);
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
                         Roboto, Helvetica, Arial, sans-serif;
            font-size: 15px;
            line-height: 1.55;
            -webkit-font-smoothing: antialiased;
          }

          .wrap { max-width: 960px; margin: 0 auto; padding: 0 20px 80px; }

          /* The wordmark: ISM, a scale, and the reading at the end of it. */
          .wordmark {
            display: inline-flex;
            align-items: center;
            gap: .45em;
            font-weight: 700;
            font-size: 1.1rem;
            letter-spacing: -.02em;
            line-height: 1;
            margin: 44px 0 26px;
          }
          .wordmark i { font-style: normal; }
          .wordmark s {
            display: block;
            width: 1.6em;
            height: 2px;
            background: var(--expansion);
            text-decoration: none;
          }
          .wordmark b {
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-weight: 700;
          }

          /* The datum: a rule with the reading sitting on it. */
          .datum {
            display: flex;
            align-items: center;
            gap: 16px;
            border-top: 1px solid var(--ink);
            padding-top: 8px;
            margin-bottom: 22px;
          }
          .datum em {
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-style: normal;
            font-weight: 700;
            font-size: .8rem;
            letter-spacing: .06em;
            color: var(--expansion);
          }
          .datum span {
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: .68rem;
            letter-spacing: .16em;
            text-transform: uppercase;
            color: var(--faint);
          }
          .datum var {
            flex: 1;
            height: 1px;
            background-image: linear-gradient(to right, var(--rule) 0 4px, transparent 4px 8px);
            background-size: 8px 1px;
            background-repeat: repeat-x;
          }

          h1 {
            font-size: clamp(1.9rem, 4.5vw, 2.7rem);
            font-weight: 600;
            line-height: 1.06;
            letter-spacing: -.03em;
            margin: 0 0 14px;
          }
          .note {
            color: var(--soft);
            margin: 0;
            max-width: 64ch;
            font-size: .96rem;
          }
          .count {
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-weight: 700;
            color: var(--expansion);
          }

          .tablewrap { overflow-x: auto; margin-top: 30px; }

          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--surface);
            border-top: 1px solid var(--ink);
            border-bottom: 1px solid var(--rule);
          }
          th {
            text-align: left;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: .66rem;
            font-weight: 500;
            letter-spacing: .14em;
            text-transform: uppercase;
            color: var(--faint);
            padding: 12px 14px 12px 0;
            border-bottom: 1px solid var(--rule);
            white-space: nowrap;
          }
          td {
            padding: 11px 14px 11px 0;
            border-bottom: 1px solid var(--rule);
            vertical-align: top;
          }
          tr:last-child td { border-bottom: none; }

          .n, .when {
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-variant-numeric: tabular-nums;
            color: var(--faint);
            width: 1%;
            white-space: nowrap;
            font-size: .86rem;
          }

          a { color: var(--expansion); text-decoration: none; }
          a:hover { text-decoration: underline; text-underline-offset: .18em; }
          a:focus-visible { outline: 2px solid var(--expansion); outline-offset: 3px; }

          .path { word-break: break-word; }
          .origin { color: var(--faint); }

          footer {
            margin-top: 34px;
            color: var(--faint);
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: .78rem;
            letter-spacing: .06em;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <p class="wordmark"><i>ISM</i><s></s><b>50</b></p>
          <xsl:apply-templates/>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- The index: a sitemap that lists other sitemaps -->
  <xsl:template match="s:sitemapindex">
    <div class="datum"><em>50</em><span>Sitemap index</span><var></var></div>
    <h1>Sitemap index</h1>
    <p class="note">
      <span class="count"><xsl:value-of select="count(s:sitemap)"/></span>
      <xsl:text> sitemap file</xsl:text>
      <xsl:if test="count(s:sitemap) != 1"><xsl:text>s</xsl:text></xsl:if>
      <xsl:text>. This page is a rendering of the XML a crawler reads. The file itself is unchanged.</xsl:text>
    </p>

    <div class="tablewrap">
      <table>
        <tr>
          <th></th>
          <th>Sitemap</th>
          <th>Last modified</th>
        </tr>
        <xsl:for-each select="s:sitemap">
          <tr>
            <td class="n"><xsl:value-of select="format-number(position(), '00')"/></td>
            <td class="path">
              <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
            </td>
            <td class="when">
              <xsl:choose>
                <xsl:when test="s:lastmod">
                  <xsl:value-of select="substring(s:lastmod, 1, 10)"/>
                </xsl:when>
                <xsl:otherwise><xsl:text>not stated</xsl:text></xsl:otherwise>
              </xsl:choose>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </div>

    <footer><a href="/">Back to ism50.com</a></footer>
  </xsl:template>

  <!-- A page sitemap -->
  <xsl:template match="s:urlset">
    <div class="datum"><em>50</em><span>Every published page</span><var></var></div>
    <h1>Sitemap</h1>
    <p class="note">
      <span class="count"><xsl:value-of select="count(s:url)"/></span>
      <xsl:text> page</xsl:text>
      <xsl:if test="count(s:url) != 1"><xsl:text>s</xsl:text></xsl:if>
      <xsl:text>. Scheduled articles are absent until their date. Each date below is derived from the page's rendered output rather than from the time of the last build, so a page that did not change does not claim to have.</xsl:text>
    </p>

    <div class="tablewrap">
      <table>
        <tr>
          <th></th>
          <th>Page</th>
          <th>Last modified</th>
        </tr>
        <xsl:for-each select="s:url">
          <tr>
            <td class="n"><xsl:value-of select="format-number(position(), '00')"/></td>
            <td class="path">
              <a href="{s:loc}">
                <!-- Show the path and keep the origin quiet: it is identical on
                     every row, and repeating it buries the part that differs.
                     "https://ism50.com" is 17 characters. -->
                <span class="origin"><xsl:value-of select="substring(s:loc, 1, 17)"/></span>
                <xsl:value-of select="substring(s:loc, 18)"/>
              </a>
            </td>
            <td class="when">
              <xsl:choose>
                <xsl:when test="s:lastmod">
                  <xsl:value-of select="substring(s:lastmod, 1, 10)"/>
                </xsl:when>
                <xsl:otherwise><xsl:text>not stated</xsl:text></xsl:otherwise>
              </xsl:choose>
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </div>

    <footer><a href="/">Back to ism50.com</a></footer>
  </xsl:template>

</xsl:stylesheet>
