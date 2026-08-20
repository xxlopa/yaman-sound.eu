# EVENT DETAIL FIX

Event documents use `event_date` instead of Jekyll's reserved `date` field.
This prevents future event dates from suppressing generated collection pages on GitHub Pages.

Expected mapping:

- `_events/haunted-vila-ii.md` -> `/haunted-vila-ii.html`
- any new `_events/<slug>.md` -> `/<slug>.html`

Pages CMS is configured to create `.md` files automatically and uses `event_date` for display ordering.
