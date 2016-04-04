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

        # Companies
        if page.data['company']

          company = page.data['company']
          company['id'] = slug(company['name'])
          company['jobs'] = {}
          company['page'] = page

          page.data.merge!({
            'layout' => 'company',
            'company' => company
          })

          @companies[company['id']] = company

        # Jobs
        elsif page.data['job']

          job = page.data['job']
          job['company'] = (company = getCompany(page))
          job['id'] = company['id'] + '_' + slug(job['title'])
          job['page'] = page

          company['jobs'][job['id']] = job


          page.data.merge!({
            'layout' => 'job',
            'job' => job,
            'company' => company
            # 'permalink' => slug(job['title'])
          })

          @jobs[job['id']] = job

        # Other pages
        else

          @otherPages << page

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
