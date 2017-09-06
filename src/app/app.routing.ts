/**
 * Created by user on 23.02.17.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { LogInComponent } from './user-activity/login.component/login.component';
import { NewUserComponent } from './user-activity/new-user.component/new-user.component';
import { SettingsComponent } from './user-activity/settings.component/settings.component';
import { StatisticComponent } from './user-activity/statistic.component/statistic.component';
console.log(location)
export const routes: Routes = [
    {
        path: 'file',
        redirectTo: '/tracker',
        pathMatch: 'full'
    },{
        path: 'tracker',
        component: AppComponent,
        children: [
            {
                path: 'login',
                component: LogInComponent,
            },
            {
                path: 'settings',
                component: SettingsComponent,
            },
            {
                path: 'create',
                component: NewUserComponent,
            },
            {
                path: 'statistic',
                component: StatisticComponent,
            },
            // {
            //     path: ':id',
            //     component: UserSingleComponent,
            // },
            // {
            //     path: ':id/edit',
            //     component: UserEditComponent,
            // }
        ]
    }
];

export const routing = RouterModule.forRoot(routes);