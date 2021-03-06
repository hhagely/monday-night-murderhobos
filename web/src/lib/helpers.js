import { format } from 'date-fns';

export function cn(...args) {
  return args.filter(Boolean).join(' ');
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map(edge => edge.node);
}

export function getBlogUrl(publishedAt, slug) {
  return `/blog/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`;
}

export function getSessionUrl(publishedAt, slug) {
  return `/session/${slug.current || slug}/`;
}

export function buildImageObj(source) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  };

  if (source.crop) {
    console.log('has crop: ', source.crop);
    imageObj.crop = source.crop;
  }
  if (source.hotspot) {
    console.log('has hotspot: ', source.hotspot);
    imageObj.hotspot = source.hotspot;
  }
  return imageObj;
}
