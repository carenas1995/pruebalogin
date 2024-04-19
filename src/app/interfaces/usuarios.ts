export class Usuarios {
    codCli: string;
    nomCli: string;
    tipIde: string;
    nitCli: string;
    digVer: string;
    codCiu: string;
    codDep: string;
    codPai: string;
    di1Cli: string;
    te1Cli: string;
    tipCli: number;
    fecIng: string;
    eMail: string;
    ap1Cli: string;
    nom1Cli: string;
    tipPer: number;
    estCli: string;
    codCliExtr: string;
    pagWeb: string;

    constructor() {
        this.codCli = "0";
        this.nomCli = " ";
        this.tipIde = "0";
        this.nitCli = "0";
        this.digVer = "0";
        this.codCiu = "0";
        this.codDep = "0";
        this.codPai = "0";
        this.di1Cli = " ";
        this.te1Cli = "0";
        this.tipCli = 2;
        this.fecIng = new Date().toISOString();
        this.eMail = " ";
        this.ap1Cli = " ";
        this.nom1Cli = " ";
        this.tipPer = 1;
        this.estCli = " ";
        this.codCliExtr = null;
        this.pagWeb = " ";
    }
}

