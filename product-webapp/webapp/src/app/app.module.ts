import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CarouselComponent } from './components/carousel/carousel.component'
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { BodyComponent } from './components/body/body.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HistoryComponent } from './components/history/history.component';
import { RouterModule } from '@angular/router';
import { ControlpanelComponent } from './components/controlpanel/controlpanel.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MiddlebodyComponent } from './components/middlebody/middlebody.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component'
import { MatBadgeModule } from '@angular/material/badge';
import { SearchComponent } from './components/search/search.component';
import { ShowSlotsComponent } from './components/show-slots/show-slots.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import {MatCardModule} from '@angular/material/card';
import { AddSlotComponent } from './components/add-slot/add-slot.component';
import { ShowBookingsComponent } from './components/show-bookings/show-bookings.component';
import {MatMenuModule} from '@angular/material/menu'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {HeaderComponent} from './components/header/header.component'
import { ServiceDetailsDialogComponent } from './components/search/service-details-dialog/service-details-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { CardsComponent } from './components/cards/cards.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FeedbackComponent } from './components/feedback/feedback.component';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomepageComponent,
    FooterComponent,
    CarouselComponent,
    DashboardComponent,
    SidenavbarComponent,
    BodyComponent,
    SettingsComponent,
    HistoryComponent,
    ControlpanelComponent,
    ContactComponent,
    MiddlebodyComponent,
    SignupComponent,
    SearchComponent,
    ServiceDetailsDialogComponent,
    ShowSlotsComponent,
    AddBookingComponent,
    AddSlotComponent,
    ShowBookingsComponent,
    DeleteConfirmationComponent,
    AddServiceComponent,
    CardsComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MdbCarouselModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    //MatTabsModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressBarModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
