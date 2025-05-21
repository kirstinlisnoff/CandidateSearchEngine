# GitHub Candidate Search 

## Description 
This React web application allowes users to browse through potential developer candidate profiles and either save or skip them. After saving candidates, their data will be organized into a table on the "Saved Candidates" tab. All of the data is retrieved through the GitHub API system using personal access tokens. 

## Installations 

1. Clone the repo:

``` 
git clone https://github.com/your-username/github-candidate-search.git cd github-candidate-search 
```

2. Instal dependencies:

``` 
npm install
```

3. Add you own .env file with your own personal access token
```
env
VITE_GITHUB_TOKEN=your_github_token_here
```

4. Build the application
```
npm run build
  ```

5. Start the server
 ```
 npm run dev
 ```

## Features

- 🔎 Browse random GitHub users as "candidates"
- 🧠 View candidate details: Name, Location, Email, Company, and Bio
- 💾 Save promising candidates to your list
- ❌ Reject saved candidates from your list
- 🧭 Easy navigation between candidate search and saved profiles
- 🎨 Clean and responsive UI with styled buttons and a formatted table

## Deployment

This app is deployable on Netlify with the following link:

## Contributors
Kirstin Lisnoff

## License 
This project is open source and available under the MIT License.