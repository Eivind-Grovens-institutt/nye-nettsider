// Resolves the media library's per-locale alt text (set in Sanity's asset
// browser) to a single string for the current $language, falling back to the
// Norwegian text since that's the primary language and least likely to be
// missing.
export const assetAltTextField = `"altText": coalesce(altText[$language], altText.no)`;

export const illustrationFields = `
  illustration{
    asset->{
      _id,
      url,
      metadata { dimensions, lqip },
      ${assetAltTextField}
    },
    hotspot,
    crop,
    alt
  }
`;

export const proseFields = `
  prose[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        ...,
        reference-> {
          _type,
          slug,
          title
        }
      }
    },
    _type == "egi-image" => {
      ...,
      asset->{
        _id,
        url,
        metadata { dimensions, lqip },
        ${assetAltTextField}
      }
    },
    _type == "recording" =>  @-> {
      _type,
      title,
      text, musicians, year,
      image {
        asset->{
          _id,
          url,
          ${assetAltTextField}
        }
      }
    },
    // video
    _type == "video" =>  @-> {
      _type,
      title,
      text,
      year,
      "videoUrl": file.asset->url,
      image {
        ...,
        asset->{
          _id,
          url,
          metadata { dimensions, lqip },
          ${assetAltTextField}
        }
      }
    },
    // lydfiler
    _type == "sound" =>  @-> {
      _type,
      title,
      text,
      year,
      "soundUrl": recording.asset->url,
    },
    // noter
    _type == "sheetmusic" =>  @-> {
      _type,
      title,
      text,
      year,
      "noteUrl": file.asset->url,
      image {
        ...,
        asset->{
          _id,
          url,
          metadata { dimensions, lqip },
          ${assetAltTextField}
        }
      }
    },
    // bibliografiske oppføringer
    _type == "book" =>  @-> {
      _type,
      title,
      text,
      year,
      authors,
      editors,
      "assetUrl": file.asset->url,
      image {
        ...,
        asset->{
          _id,
          url,
          metadata { dimensions, lqip },
          ${assetAltTextField}
        }
      }
    },
    _type == "pullquote" => {
      contents,
      quotee,
      quoteeDesc
    },
    _type == "article-list" => {
        ...,
        image{
          ...,
          asset->{
            _id,
            url,
            ${assetAltTextField}
          }
        },
        articles[]->{
        title,
        lead,
        ${illustrationFields},
        category->{ title },
        slug,
        language
      }
    }
  }
`;

export const ctaArticleFields = `      _type,
      text,
      image{
        _type,
        title,
        photographer,
        persons,
        tags,
        asset->{
          _id,
          url,
          metadata { dimensions, lqip },
          ${assetAltTextField}
        }
      },
      article->{
        title,
        lead,
        ${illustrationFields},
        ${proseFields},
        author->{ name },
        category->{ title },
        slug,
        language
      },
      link
`;
