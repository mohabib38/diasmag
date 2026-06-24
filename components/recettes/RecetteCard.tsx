'use client';

import {useMemo, useState} from 'react';

type Locale = 'fr' | 'ar' | 'en';

type Recipe = {
  name: string;
  country: 'Maroc' | 'Algérie' | 'Tunisie';
  type: 'Végétarien' | 'Halal';
  ingredients: string[];
  steps: string[];
};

const recipes: Recipe[] = [
  {name: 'Couscous aux légumes', country: 'Maroc', type: 'Végétarien', ingredients: ['Semoule', 'Carottes', 'Courgettes', 'Pois chiches'], steps: ['Cuire la semoule.', 'Préparer le bouillon.', 'Servir avec les légumes.']},
  {name: 'Chakchouka', country: 'Tunisie', type: 'Végétarien', ingredients: ['Tomates', 'Poivrons', 'Œufs', 'Ail'], steps: ['Faire revenir les légumes.', 'Ajouter les tomates.', 'Cuire les œufs.']},
  {name: 'Rechta', country: 'Algérie', type: 'Halal', ingredients: ['Pâtes rechta', 'Poulet', 'Navets', 'Pois chiches'], steps: ['Cuire le poulet.', 'Préparer la sauce.', 'Assembler et servir.']},
  {name: 'Tajine kefta', country: 'Maroc', type: 'Halal', ingredients: ['Viande hachée', 'Tomates', 'Œufs', 'Épices'], steps: ['Former les keftas.', 'Mijoter la sauce.', 'Ajouter les œufs.']},
  {name: 'Lablabi', country: 'Tunisie', type: 'Halal', ingredients: ['Pois chiches', 'Pain', 'Harissa', 'Œuf'], steps: ['Chauffer le bouillon.', 'Assembler dans un bol.', 'Ajouter les garnitures.']},
  {name: 'Mhajeb', country: 'Algérie', type: 'Végétarien', ingredients: ['Semoule fine', 'Tomates', 'Oignons', 'Huile'], steps: ['Pétrir la pâte.', 'Préparer la farce.', 'Cuire sur plaque chaude.']}
];

const copy = {
  fr: {filters: 'Filtres', country: 'Pays', type: 'Type', ingredients: 'Ingrédients', steps: 'Étapes'},
  ar: {filters: 'الفلاتر', country: 'البلد', type: 'النوع', ingredients: 'المكونات', steps: 'الخطوات'},
  en: {filters: 'Filters', country: 'Country', type: 'Type', ingredients: 'Ingredients', steps: 'Steps'}
} as const;

export default function RecetteCard({locale}: {locale: Locale}) {
  const t = copy[locale] ?? copy.fr;
  const [country, setCountry] = useState<'Tous' | Recipe['country']>('Tous');
  const [type, setType] = useState<'Tous' | Recipe['type']>('Tous');

  const filteredRecipes = useMemo(
    () =>
      recipes.filter(
        (recipe) =>
          (country === 'Tous' || recipe.country === country) &&
          (type === 'Tous' || recipe.type === type)
      ),
    [country, type]
  );

  return (
    <section className="space-y-6">
      <div className="diasmag-card p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-sm font-semibold text-dark">{t.filters}</div>
          <select value={country} onChange={(event) => setCountry(event.target.value as typeof country)} className="rounded-2xl border border-slate-200 px-4 py-3">
            <option value="Tous">{t.country}: Tous</option>
            <option value="Maroc">Maroc</option>
            <option value="Algérie">Algérie</option>
            <option value="Tunisie">Tunisie</option>
          </select>
          <select value={type} onChange={(event) => setType(event.target.value as typeof type)} className="rounded-2xl border border-slate-200 px-4 py-3">
            <option value="Tous">{t.type}: Tous</option>
            <option value="Végétarien">Végétarien</option>
            <option value="Halal">Halal</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filteredRecipes.map((recipe) => (
          <article key={recipe.name} className="diasmag-card overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-emerald/15 via-emerald/5 to-gold/20" />
            <div className="space-y-5 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold text-dark">{recipe.name}</h3>
                <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">{recipe.country}</span>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-amber-700">{recipe.type}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">{t.ingredients}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">{t.steps}</p>
                <ol className="mt-3 space-y-2 text-sm text-slate-600">
                  {recipe.steps.map((step, index) => (
                    <li key={step}>
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
