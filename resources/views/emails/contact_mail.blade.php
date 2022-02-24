@component('mail::message')
# Kapcsolatfelvételi ürlap

Kedves Adminisztrátor,

{{now()}} -kor a {{Request::ip()}} -ip címről az alábbi üzenetet küldték:

Név: {{ $request->firstName.' '.$request->lastName }}<br>
Email: {{$request->email}}<br>
Telefon: {{$request->phone}}<br>
Üzenet: <i>"{{$request->message}}"</i><br>
<br><br>

Köszönettel,<br>
{{ config('app.name') }}
@endcomponent
