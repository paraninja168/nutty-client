import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmsService } from 'src/app/services/sms/sms.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
    allSMS: any[] = [];
    allStatus: any[] = [];
    loading: boolean = false;

    fields = {
        phone: '',
        message: '',
        status: '',
    };

    filter = {};
    p: number = 1;
    totalSMS: number;

    statusFilter = ['sent', 'queued'];

    updateFilters() {
        // Object.keys(this.fields).forEach((key) =>
        //     this.fields[key] === '' ? delete this.fields[key] : key
        // );
        // this.filter = Object.assign({}, this.fields);

        this.getPage(1);
    }

    constructor(private service: SmsService, private router: Router) {}

    ngOnInit(): void {
        this.getPage(1);
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getAllSMS(this.fields, page).subscribe((response) => {
            this.allSMS = response['data'];
            this.p = page;
            this.allStatus = this.statusFilter;
            this.totalSMS = response['total_data'];
            this.loading = false;
        });
    }

    delete(id, phone) {
        let data = {
            platform: 'Website',
            id: id.$oid,
        };

        if (confirm('Are you sure to delete sms: ' + phone)) {
            this.service.deleteSMS(data).subscribe((response) => {
                // console.log(response);
                if (response.result === true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'SMS deleted successfully',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    });
                    this.getPage(1);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.response,
                        icon: 'error',
                        confirmButtonText: 'Close',
                    });
                }
            });
        }
    }
}
