export const proseFields = `
  prose[]{
    ...,
    _type == "egi-image" => {
      ...,
      asset->{
        _id,
        url,
        metadata { dimensions, lqip }
      }
    },
    _type == "video" => {
      ...,
      poster{
        asset->{
          _id,
          url
        }
      }
    },
    _type == "pullquote" => {
      contents,
      quotee,
      quoteeDesc
    }
  }
`;

export const illustrationFields = `
  illustration{
    asset->{
      _id,
      url
    },
    alt
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
