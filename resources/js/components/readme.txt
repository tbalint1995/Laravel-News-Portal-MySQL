B. Bálint

kapcsolat ürlap:

---
url: /api/contact

---
küldött adatok:

{
    vnev:
    knev: 
    email:
    telefon:
    uzenet:
}

---
Formai hiba:

vnev < 2 || vnev > 30
knev < 2 || knev > 30
email 
telefon
uzenet < 10 || uzenet > 600

errors: {
    vnev: v. név ....
    knev: v. név ....
}
---
success:{
    message: sikeres....
}

---
rendszerhiba:

errors: {
   system: smtp exception ....
}

============================================================================

Tamás:

Kategória

/api/category/{id}

[
    {
        id:
        title:
        image:
        content:
    },
        {
        id:
        title:
        image:
        content:
    }
]

/api/search?keyword={kw}

[
    {
        id:
        title:
        image:
        content:
    },
        {
        id:
        title:
        image:
        content:
    }
]

===================================================

Takács Bálint 

/api/banners

[ 
    {
        id: '1',
        file: 'https://cdn-images-1.medium.com/max/1600/1*CclhZeNGjtrFbX8zwKKRMQ.gif',
        url: 'http://www.google.com',
        title: 'valami title',
        alt: 'alt valami'
    } ,

    {
        id: '2',
        file: 'https://cdn-images-1.medium.com/max/1600/1*CclhZeNGjtrFbX8zwKKRMQ.gif',
        url: 'http://www.google.com',
        title: 'valami title',
        alt: 'alt valami'
    }  
]
