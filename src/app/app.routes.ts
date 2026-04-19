import { Routes } from '@angular/router';
import path from 'path';
import { ProgramMasterComponent } from '../Forms/program-master/program-master.component';
import { ProgramListsComponent } from '../Forms/program-lists/program-lists.component';

export const routes: Routes = [
    {
        path:'ProgramMaster',
        component:ProgramMasterComponent
    },
    {
        path:'ProgramList',
        component:ProgramListsComponent
    }
];
