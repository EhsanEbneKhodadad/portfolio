---
title: "1–2 milyon açık artırma kaydı üzerinde yaklaşık eşleşmeli arama"
summary: "Yaklaşık eşleştirme ve gelişmiş filtrelerin mozayedegar.com’da açık artırma ilanlarının keşfini nasıl desteklediği."
date: "2026-11-14"
draft: false
---

[mozayedegar.com](/projects/mozayedegar)’da, yaklaşık 1–2 milyon açık artırma kaydı üzerinde yaklaşık eşleştirme ve gelişmiş filtreleme kullanan bir Elasticsearch araması geliştirdim. Sorgu yanıt süreleri üç saniyenin üzerinden bir saniyenin altına düştü.

## Metni eşleştirmek ve sonuçları daraltmak

Yaklaşık eşleştirme, kullanıcılar sorgunun bir bölümünü yanlış yazdığında bile bir ilanı bulmalarına olanak tanır. Bunun karşılığında daha geniş bir eşleşme, daha az ilgili sonuçları içerebilir ve daha fazla işlem gerektirebilir. Filtrelerin amacı farklıdır: sonuçları kullanıcının seçtiği ölçütlere göre daraltırlar. Bu iki konuyu ayrı tutmak, aramanın metin hatalarına karşı esnek olmasını ve aynı zamanda kullanıcının açıkça belirttiği kısıtlamalara uymasını sağlar.

## Süre ölçümleri bize ne anlatıyor?

Önceki ve sonraki süreler, proje için bildirilen iyileşmeyi tanımlar. Kayıt sayısı ise aranabilir koleksiyonun ölçeğini gösterir. Bu iki değer de bir gecikme yüzdeliğini ortaya koymaz; süre ölçümleri bu bağlamda değerlendirilmelidir.
