const gameLists = [
    {
        A: "Master",
        B: "FISHING",
        C: "F-SF01 ",
        D: "Fishing God",
        E: "捕鱼天王",
        F: "N/A",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "N",
        O: "N",
        P: "N",
        Q: "Y",
        R: "Y",
        S: "97",
        T: "medium",
        U: "43431",
        V: "-",
        W: "11.5MB"
    },
    {
        A: "Test Custom",
        B: "FISHING",
        C: "F-SF02",
        D: "Fishing War",
        E: "捕鱼大战",
        F: "N/A",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "N",
        O: "N",
        P: "N",
        Q: "Y",
        R: "Y",
        S: "97",
        T: "medium",
        U: "43432",
        V: "-",
        W: "11.5MB"
    },
    {
        A: "Test Custom",
        B: "Live22",
        C: "S-JT02",
        D: "Joker's Treasure ",
        E: "小丑宝藏",
        F: "5",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "N",
        Q: "N",
        R: "Y",
        S: "96.51",
        T: "medium",
        U: "43970",
        V: "1000000",
        W: "5.9MB"
    },
    {
        A: "Senior",
        B: "Live22",
        C: "S-DF03",
        D: "Double Flame",
        E: "双炎至尊",
        F: "25",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "Y",
        R: "Y",
        S: "96.5",
        T: "medium",
        U: "43942",
        V: "310400",
        W: "16.2MB"
    },
    {
        A: "Senior",
        B: "918Kiss",
        C: "S-BM01",
        D: "Book of Myth",
        E: "埃及古宝",
        F: "10",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "96.5",
        T: "medium",
        U: "43907",
        V: "5000000",
        W: "11.7MB"
    },
    {
        A: "Senior",
        B: "SA Game",
        C: "S-WC02",
        D: "Wong Choy",
        E: "旺财",
        F: "15",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "Y",
        J: "Grand Jackpot",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "Y",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "95",
        T: "Medium",
        U: "43916",
        V: "2669300",
        W: "7.0MB"
    },
    {
        A: "Master",
        B: "Live22",
        C: "S-MM01",
        D: "Money Mouse",
        E: "鼠来宝",
        F: "243",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML6",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "96.5",
        T: "medium",
        U: "43815",
        V: "607500",
        W: "9.6MB"
    },
    {
        A: "Super Senior",
        B: "AWC Sexy",
        C: "S-DE01",
        D: "Dragon Empire",
        E: "龙飞凤舞",
        F: "243",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "Y",
        J: "Mega Cash Jackpot",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "Y",
        R: "Y",
        S: "96.01",
        T: "Medium",
        U: "43788",
        V: "96000",
        W: "11.4MB"
    },
    {
        A: "Super Senior",
        B: "WM Casino",
        C: "S-BA01",
        D: "888",
        E: "888",
        F: "1",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "N",
        Q: "N",
        R: "Y",
        S: "96.09",
        T: "medium",
        U: "43760",
        V: "79200",
        W: "4.2MB"
    },
    {
        A: "Super Senior",
        B: "PG Soft",
        C: "S-LS02",
        D: "Three Lucky Stars",
        E: "三福星",
        F: "1",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "N",
        Q: "N",
        R: "Y",
        S: "96.9",
        T: "medium",
        U: "43725",
        V: "90000",
        W: "3.8MB"
    },
    {
        A: "Master",
        B: "SlotXO",
        C: "S-HE01",
        D: "Heroes",
        E: "英雄",
        F: "50",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "96.97",
        T: "medium",
        U: "43691",
        V: "250000",
        W: "13.9MB"
    },
    {
        A: "Master",
        B: "SpadeGame",
        C: "S-SB01",
        D: "Sweet Bakery",
        E: "梦幻甜点",
        F: "10",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "N",
        Q: "Y",
        R: "Y",
        S: "96.9",
        T: "medium",
        U: "43669",
        V: "200000",
        W: "7.2MB"
    },
    {
        A: "Master",
        B: "Joker",
        C: "S-DF02",
        D: "Dancing Fever",
        E: "跳跳舞",
        F: "243",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "96.5",
        T: "medium",
        U: "43641",
        V: "4916400",
        W: "7.5MB"
    },
    {
        A: "Master",
        B: "CQ9",
        C: "S-ML01",
        D: "Magical Lamp",
        E: "神灯",
        F: "50",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "Y",
        R: "Y",
        S: "97.01",
        T: "medium",
        U: "43606",
        V: "366000",
        W: "13.8MB"
    },
    {
        A: "Super Senior",
        B: "EsportBull",
        C: "S-TP02",
        D: "Triple Panda",
        E: "三倍熊猫",
        F: "5",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "96.93",
        T: "medium",
        U: "43569",
        V: "500000",
        W: "7.8MB"
    },
    {
        A: "Super Senior",
        B: "IA Esports",
        C: "S-GP01",
        D: "Gold Panther",
        E: "黑金豹",
        F: "4096",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97.01",
        T: "medium",
        U: "43536",
        V: "2428800",
        W: "6.6MB"
    },
    {
        A: "Super Senior",
        B: "King Maker",
        C: "S-CH01",
        D: "Mr Chu Tycoon",
        E: "朱大富",
        F: "40",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97.01",
        T: "medium",
        U: "43481",
        V: "86400",
        W: "7.9MB"
    },
    {
        A: "Senior",
        B: "SlotXO",
        C: "S-GK01",
        D: "Brothers kingdom",
        E: "桃园三兄弟",
        F: "20",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "Y",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97.2",
        T: "medium",
        U: "43431",
        V: "183600",
        W: "13.4MB"
    },
    {
        A: "Senior",
        B: "PG Soft",
        C: "S-PG01",
        D: "Prosperity Gods",
        E: "四大财神",
        F: "20",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97",
        T: "medium",
        U: "43397",
        V: "233000",
        W: "15.3MB"
    },
    {
        A: "Senior",
        B: "WM Casino",
        C: "S-CP01",
        D: "Candy Pop",
        E: "糖果泡泡",
        F: "N/A",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "Y",
        N: "Y",
        O: "N",
        P: "N",
        Q: "Y",
        R: "Y",
        S: "96.57",
        T: "medium",
        U: "43312",
        V: "427800",
        W: "9.5MB"
    },
    {
        A: "Senior",
        B: "AWC Sexy",
        C: "S-GF01",
        D: "Golden Fist",
        E: "金武门",
        F: "25",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "Y",
        R: "Y",
        S: "97.01",
        T: "Medium",
        U: "43284",
        V: "1500000",
        W: "13.6MB"
    },
    {
        A: "Test Custom",
        B: "918Kiss",
        C: "S-LY02",
        D: "FaFaFa2",
        E: "发发发2",
        F: "1",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "N",
        Q: "N",
        R: "Y",
        S: "97.12",
        T: "Medium",
        U: "43116",
        V: "81000",
        W: "3.8MB"
    },
    {
        A: "Test Custom",
        B: "SA Game",
        C: "S-GA01 ",
        D: "Gangster Axe ",
        E: "斧头帮",
        F: "100",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97.03",
        T: "Medium",
        U: "43116",
        V: "884850",
        W: "5.9MB"
    },
    {
        A: "Test Custom",
        B: "Joker",
        C: "S-PW02",
        D: "Princess Wang",
        E: "旺旺公主",
        F: "15",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97.04",
        T: "Medium",
        U: "43116",
        V: "414700",
        W: "8.6MB"
    },
    {
        A: "Test Custom",
        B: "Joker",
        C: "S-WP02 ",
        D: "Wow Prosperity",
        E: "汪旺财",
        F: "1024",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97.04",
        T: "Medium",
        U: "43116",
        V: "797680",
        W: "8.1MB"
    },
    {
        A: "Test Custom",
        B: "CQ9",
        C: "S-FL02 ",
        D: "First Love ",
        E: "初恋",
        F: "243",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "Y",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "96.91",
        T: "Medium",
        U: "43039",
        V: "1273020",
        W: "8.6MB"
    },
    {
        A: "Master",
        B: "CQ9",
        C: "S-FM02",
        D: "Golden Monkey",
        E: "齐天大胜",
        F: "50",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97.03",
        T: "Medium",
        U: "43039",
        V: "2336000",
        W: "7.1MB"
    },
    {
        A: "Master",
        B: "SpadeGame",
        C: "S-PP01",
        D: "Pan Fairy",
        E: "潘精灵",
        F: "9",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "96.92",
        T: "Medium",
        U: "43039",
        V: "321450",
        W: "6.8MB"
    },
    {
        A: "Master",
        B: "King Maker",
        C: "S-SH01",
        D: "ShangHai 008",
        E: "上海 00发",
        F: "25",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97.01",
        T: "Medium",
        U: "43039",
        V: "373200",
        W: "8.0MB"
    },
    {
        A: "Master",
        B: "SA Game",
        C: "S-TZ01",
        D: "Jungle King",
        E: "森林之王",
        F: "1024",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "N",
        N: "Y",
        O: "N",
        P: "Y",
        Q: "Y",
        R: "Y",
        S: "96.99",
        T: "Medium",
        U: "43039",
        V: "442160",
        W: "9.0MB"
    },
    {
        A: "Super Senior",
        B: "AWC Sexy",
        C: "S-FG01 ",
        D: "Fist of Gold ",
        E: "新霸天下",
        F: "243",
        G:
            "English, Chinese(Simplified),Thailand, Vietname, Indonesia, Korea, Japan,Russia,Turkey",
        H:
            "MYR, SGD,CNY,IDR, THB,VND,HKD, USD,EUR, GBP,KRW,MMK,BDT,JPY,INR, AUD,ID2,VN2",
        I: "N",
        J: "N/A",
        K: "HTML5",
        L: "HTML5",
        M: "Y",
        N: "y",
        O: "N",
        P: "Y",
        Q: "N",
        R: "Y",
        S: "97.01",
        T: "Medium",
        U: "42887",
        V: "1860360",
        W: "6.5MB"
    }
]
export default gameLists