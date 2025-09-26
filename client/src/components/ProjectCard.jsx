import React from "react";

const ProjectCard = ({ image, title, description, tech, githubLink }) => {
  return (
    <div className="max-w-sm h-full rounded-lg overflow-hidden shadow-lg m-2 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-gray-200 dark:bg-gray-800 flex flex-col">
      <img className="w-full h-40 object-cover" src={image} alt={title} />
      <div className="flex flex-col flex-1 px-4 py-3">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          {title}
        </div>
        <p className="text-base text-gray-800 dark:text-gray-300">
          {description}
        </p>
        <div className="mt-3">
          {tech.map((t, index) => (
            <span
              key={index}
              className="inline-block bg-gray-300 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 dark:text-gray-200 mr-2 mb-2"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          {githubLink ? (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 font-medium"
            >
              GitHub
            </a>
          ) : (
            <span className="text-gray-500">GitHub</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
