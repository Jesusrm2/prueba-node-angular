import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { DataViewModule } from 'primeng/dataview';
import { TreeTableModule } from 'primeng/treetable';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import {BreadcrumbModule} from 'primeng/breadcrumb';

import {CheckboxModule} from 'primeng/checkbox';
@NgModule({
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    TableModule,
    ListboxModule,
    ProgressSpinnerModule,
    PanelModule,
    MenubarModule,
    DialogModule,
    FieldsetModule,
    FileUploadModule,
    TagModule,
    ToolbarModule,
    DataViewModule,
    TreeTableModule,
    SidebarModule,
    DropdownModule,
    AccordionModule,
    MultiSelectModule,
    DividerModule,
    MessagesModule,
    MessageModule,
    TabViewModule,
    RadioButtonModule,
    TriStateCheckboxModule,
    BreadcrumbModule,
    ChipModule,
    CheckboxModule
  ],
  providers: [MessageService],
})
export class PrimeNgModule { }
