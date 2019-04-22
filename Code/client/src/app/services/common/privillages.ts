import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class Privillages {
    getPrivillages() {
        return [
            {"name":"usergroup","set":false,"group":"user","order":1},
            {"name":"user","set":false,"group":"user","order":0},
            {"name":"home","set":false,"group":"home","order":0},
            {"name":"machine","set":false,"group":"machine","order":0},
            {"name":"reasons","set":false,"group":"machine","order":4},
            {"name":"line","set":false,"group":"machine","order":3},
            {"name":"area","set":false,"group":"machine","order":2},
            {"name":"machinegroup","set":false,"group":"machine","order":1},
            {"name":"settings","set":false,"group":"settings","order":1},
            {"name":"import","set":false,"group":"settings","order":2},
            {"name":"document","set":false,"group":"machine","order":5},
            {"name":"part","set":false,"group":"machine","order":6},
            {"name":"steps","set":false,"group":"machine","order":7},
            {"name":"template","set":false,"group":"machine","order":8},
        ];
    }
}