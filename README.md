<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Supabase Assets Uploader

Github action to distribute assets/artifacts to a supabase bucket. It will upload all files recursive from a repo folder

# Usage

Just add this to your action

```yaml
uses: websublime/supabase-assets
with:
  url: <SUPABASE URL>
  key: <SUPABASE_SECRET>
  folder: <ARTIFACTS_FOLDER>
  bucket: <SUPABASE_BUCKET>
  destiny: <SUPABASE_BUCKET_FOLDER>
```