export const illustrationFields = `
  illustration{
    asset->{
      _id,
      url
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
        metadata { dimensions, lqip }
      }
    },
    _type == "recording" =>  @-> {
      _type,
      title,
      text, musicians, year,
      image {
        asset->{
          _id,
          url
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
          metadata { dimensions, lqip }
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
      image {
        ...,
        asset->{
          _id,
          url,
          metadata { dimensions, lqip }
        }
      }
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
          metadata { dimensions, lqip }
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
          metadata { dimensions, lqip }
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
          metadata { dimensions, lqip }
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
