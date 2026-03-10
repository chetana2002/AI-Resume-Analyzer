const SKILLS = {
  programming: ["python","java","javascript","typescript","c++"],
  frontend: ["react","vue","angular","html","css","tailwind"],
  backend: ["node","spring","django","flask","express"],
  cloud: ["aws","azure","gcp","docker","kubernetes"],
  data: ["machine learning","pandas","numpy","sql","tensorflow"]
};

export function detectSkills(text: string) {
  const found: string[] = [];

  Object.values(SKILLS).flat().forEach(skill => {
    if (text.toLowerCase().includes(skill)) {
      found.push(skill);
    }
  });

  return [...new Set(found)];
}