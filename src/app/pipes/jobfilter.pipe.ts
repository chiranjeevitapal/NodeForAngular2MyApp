import { Pipe, PipeTransform } from '@angular/core';

import { Walkin } from '../model/walkin';
@Pipe({
    name: 'jobfilter',
    pure: false
})
export class JobFilterPipe implements PipeTransform {
    transform(allJobs: Walkin[], criteria: string, parameter: string) {
        // filter items array, items which match and return true will be kept, false will be filtered out
        if(criteria == 'location'){
          if(parameter=='All'){
            return allJobs;
          }
          return allJobs.filter(job => job.location.toLowerCase().indexOf(parameter.toLowerCase()) != -1);
        }
        if(criteria == 'eligibility'){
          if(parameter=='All'){
            return allJobs;
          }
          return allJobs.filter(job => job.eligibility.toLowerCase().indexOf(parameter.toLowerCase()) != -1);
        }
        if(criteria == 'experience'){
          if(parameter=='All'){
            return allJobs;
          }
          return allJobs.filter(job => job.experience.toLowerCase().indexOf(parameter.toLowerCase()) != -1);
        }
        return allJobs;
    }
}
