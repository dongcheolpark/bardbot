
class List {
    protected Datas:string[] = [];
    protected size:number = 0;
    SetList(arr : string[]) {
        this.Datas = arr; 
    }
    GetList() {
        return this.Datas;
    }
    Add(data : string) {
        this.Datas[this.size] = data;
        this.size++;
    }
    GetSize() {
        return this.size;
    }
    Remove(n : number) {
        let res = this.Datas[n];
        for(let i = n;i<this.size-1;i++) {
            this.Datas[i] = this.Datas[i+1]; 
        }
        this.size--;
        return res;
    }
    find(n : number) {
        return this.Datas[n];
    }
}

class TeamList extends List {
    GetRandomTeam() {
        let team1:List = new List();
        let team2:List = new List();
        let temp:List = new List();

        temp.SetList(this.Datas);
        const n = this.size;
        let chk:boolean = true;
        for(let i = 0;i<n;i++) {
            let a = Math.random()%(n-i);
            if(chk) {
                team1.Add(temp.Remove(a));
                chk = !chk;
            }
            else {
                team2.Add(temp.Remove(a));
                chk = !chk;
            }
        }
        return [team1,team2];
    }
}

export {
    List,
    TeamList
}