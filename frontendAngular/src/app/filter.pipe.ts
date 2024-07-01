import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.c_nama.toLowerCase().includes(searchText) || 
             (it.owner.profile.nama && it.owner.profile.nama.toLowerCase().includes(searchText)) || 
             it.owner.email.toLowerCase().includes(searchText);
    });
  }
}
