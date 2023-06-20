import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmsService } from 'src/app/services/sms/sms.service';
import { DataService } from 'src/app/services/global/data.service';

@Component({
    selector: 'app-sent',
    templateUrl: './sent.component.html',
    styleUrls: ['./sent.component.scss'],
})
export class SMSSentComponent implements OnInit {
    allPrefix: any[];
    selectedPrefix = '62';
    id: string;

    fields = {
        platform: 'Website',
        phone: '',
        message: '',
    };

    constructor(
        private route: ActivatedRoute,
        private service: SmsService,
        private router: Router,
        private dataPrefix: DataService
    ) {}

    ngOnInit(): void {
        this.allPrefix = this.dataPrefix.phonePrefix();
        this.allPrefix.map((i) => {
            i.countryCode = i.country + ' (+' + i.code + ')';
            return i;
        });
    }

    submit() {
        this.fields = {
            platform: 'Website',
            phone: '+' + this.selectedPrefix + this.fields['phone'],
            message: this.fields['message'],
        };

        console.log(this.fields);
        return;

        this.service.sendSingleSMS(this.fields).subscribe((response) => {
            // console.log(response);

            if (response.status === true) {
                // console.log('SMS sent successfully');
                this.router.navigate(['/sms/sent']);
            }
        });
    }
}