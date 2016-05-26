module Jekyll
  module HumanDay

    @@months = [
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie'
    ]

    def humanday(input)
      _date = input.to_s.split('-')
      if _date.size == 3

        year = _date[0]
        month = @@months[_date[1].to_i - 1]
        day = _date[2]

        if day[0, 1] == "0"
          day = day[1,1]
        end

        return "#{day} #{month}, #{year}"
      end
      
      return input
    end
  end
end

# Usage
# {% day 2015-05-13 %}

Liquid::Template.register_filter(Jekyll::HumanDay)
