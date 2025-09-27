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
