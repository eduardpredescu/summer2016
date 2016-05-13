module Summerjobs

  class Generator < Jekyll::Generator

    def generate(site)

      @companies = {}
      @jobs = {}
      @otherPages = []

      def slug(string)
        string.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      end

      def getCompany(page)
        companyId = page.path.rpartition('/')[-3]
        @companies[ companyId ]
      end

      site.pages.each do |page|

        # dateCreated = File.ctime(page['path']).iso8601
        # dateModified = File.mtime(page['path']).iso8601
        # page.data['dateCreated'] = dateCreated
        # page.data['dateModified'] = dateModified

        if page.data
          
          # Companies
          if page.data['company']
            if not page.data['demo']
              company = page.data['company']
              company['id'] = slug(company['name'])
              company['jobs'] = {}
              company['page'] = page

              page.data.merge!({
                'layout' => 'company',
                'company' => company
              })

              @companies[company['id']] = company
            else
              page.data['layout'] = 'company'  
            end

          # Jobs
          elsif page.data['job']
            if not page.data['demo']
            
              job = page.data['job']
              job['company'] = (company = getCompany(page))
              job['id'] = company['id'] + '_' + slug(job['title'])
              job['page'] = page

              company['jobs'][job['id']] = job

              page.data.merge!({
                'layout' => 'job',
                'job' => job,
                'company' => company
              })
              @jobs[job['id']] = job
            else
              page.data['layout'] = 'job'
            end

          # Other pages
          else

            @otherPages << page

          end
          
        end
      end

      # puts @companies.to_yaml
      # puts @jobs.to_yaml

      site.data['companies'] = @companies
      site.data['jobs'] = @jobs
      # p(otherPages)

    end
  end

end
