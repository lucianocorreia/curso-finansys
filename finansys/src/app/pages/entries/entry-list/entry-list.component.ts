import { Component, OnInit } from '@angular/core';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { error } from 'util';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit() {
    this.entryService.getAll()
      .subscribe(
        entries => this.entries = entries,
        error => alert('Erro ao carregar a lista: ' + error)
      );
  }

  deleteEntry(entry: Entry) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.entryService.delete(entry.id)
        .subscribe(
          () => this.entries = this.entries.filter(item => item !== entry),
          () => alert('Erro ao tentar excluir')
        );
    }
  }

}
