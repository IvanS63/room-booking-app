import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    constructor(private userService: UserService,
        private tokenStorage: TokenStorageService,
        private router: Router) { }
    users: User[];
    private user: User;
    form: any = {};
    private authority: string;
    private file: File;

    getUsers(): void {
        this.userService.getAllUsers()
            .subscribe((data: User[]) => {
                this.users = data,
                    console.log(data)
            }, error => {
                console.error(error);
            });
    }

    ngOnInit(): void {
        this.getUsers();
        if (this.tokenStorage.getToken()) {
            this.tokenStorage.getAuthorities().every(role => {
                if (role === 'ROLE_ADMIN') {
                    this.authority = 'admin';
                    return false;
                } else if (role === 'ROLE_USER') {
                    this.authority = 'user';
                    return false;
                }
                this.authority = 'user';
                return true;
            });
        }
    }

    fileChanged(e) {
        this.file = e.target.files[0];
    }

    addUser() {
        var id = this.form.id;
        var formData = new FormData();
        formData.append('file', this.file);
        var updateResult;
        this.user = new User(
            this.form.login, this.form.name, this.form.email);
        if (id == null) {
            updateResult = this.userService.addUser(this.user);
        } else {
            updateResult = this.userService.updateUser(id, this.user);
        }
        this.userService.uploadFile(formData)
            .subscribe(response => console.log(response));
        updateResult.subscribe(response => {
            window.location.reload();
            console.log(response);
        },
            (error) => { console.log(error); }
        );
    }

    deleteUser(id: number) {
        this.userService.deleteUser(id)
            .subscribe(
                data => {
                    console.log(data);
                    this.userService.getAllUsers().subscribe((data: User[]) => {
                        this.users = data
                    })
                }, error =>
                console.error(error));
        window.location.reload();
    }

    logout() {
        this.tokenStorage.signOut();
        this.router.navigateByUrl("login");
    }

}