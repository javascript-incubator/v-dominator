const $ = arg => document.querySelector(arg)

export const mutatorScroll = (scrollEl) => x => {
  if (x.length) $(scrollEl).scrollTo($(scrollEl).scrollWidth, 0)
  return x
}
