module Summerjobs

  class Generator < Jekyll::Generator

    def generate(site)

      @companies = {}
      @jobs = {}
      @otherPages = []

      companies = site.pages.select do |page|
        page.data['company']
      end

      jobs = site.pages.select do |page|
        page.data['job']
      end

      def slug(string)
        string.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      end

      def getCompany(page)
        companyId = page.path.rpartition('/')[-3]
        @companies[ companyId ]
      end

      companies.each do |page|
        if not page.data['demo']
          company = page.data['company']
          company['id'] = slug(company['name'])
          company['jobs'] = {}
          company['page'] = page
          company['weight']= (page.data['weight']) ? page.data['weight'] : 0
          page.data.merge!({
            'layout' => 'company',
            'company' => company,
          })
          @companies[company['id']] = company

        else
          page.data['layout'] = 'company'
        end
      end

      jobs.each do |page|
        if not page.data['demo']

          job = page.data['job']
          job['company'] = (company = getCompany(page))
          job['id'] = company['id'] + '_' + slug(job['title'])
          job['page'] = page
          job['weight'] = (page.data['status']=="closed") ? -1 : 0
          job['status'] = (page.data['status']) ? page.data['status'] : 'open'
          company['jobs'].merge!({
            job['id'] => job
          })

          page.data.merge!({
            'layout' => 'job',
            'job' => job,
            'company' => company
          })
          @jobs[job['id']] = job
        else
          page.data['layout'] = 'job'
        end
      end

      @companies.each do |key,value|
        @jobs_sorted = value['jobs'].sort_by{ |k, v| v['weight'] }.reverse
        value['jobs'] = @jobs_sorted
      end
      @companies_sorted=@companies.sort_by { |k, v| v['weight'] }.reverse
      site.data['companies'] = @companies_sorted
      site.data['jobs'] = @jobs
      # p(otherPages)

    end
  end

end
