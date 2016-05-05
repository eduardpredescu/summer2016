module Jekyll
  module Folder
    def folder(input, page)
      url = page['url']
      if (url.index('.html'))
        url = url.slice(0..(url.rindex('/')));
      elsif (url[-1, 1] != '/')
        url += '/'
      end
      return url + input
    end
  end
end

Liquid::Template.register_filter(Jekyll::Folder)
