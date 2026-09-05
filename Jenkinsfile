const systems = {
  aws: {
    index: "SYSTEM 01",
    state: "RESILIENT",
    mapTitle: "AWS WORDPRESS / REQUEST PATH",

    title: "Highly Available WordPress on AWS",

    summary:
      "A three-tier architecture designed for secure routing, elastic application capacity and managed database persistence.",

    decisions: [
      "Public and private subnet separation",
      "Auto Scaling behind an Application Load Balancer",
      "RDS access restricted to the application tier"
    ],

    tech: [
      "VPC",
      "EC2",
      "ALB",
      "RDS",
      "S3"
    ],

    outcome:
      "Scalable application delivery with isolated data services.",

    nodes: [
      ["USR", "Users", "Internet traffic"],
      ["53", "Route 53", "DNS routing"],
      ["ALB", "Load Balancer", "Public subnets"],
      ["EC2", "Auto Scaling", "Application tier"],
      ["RDS", "MySQL", "Private database"]
    ]
  },

  kubernetes: {
    index: "SYSTEM 02",
    state: "SCHEDULED",
    mapTitle: "KUBERNETES / SERVICE & DATA FLOW",

    title: "Multi-node WordPress on Kubernetes",

    summary:
      "A container platform separating stateless WordPress replicas from a persistent MySQL workload across worker nodes.",

    decisions: [
      "Three WordPress replicas behind a NodePort Service",
      "StatefulSet and PVC for MySQL persistence",
      "Calico NetworkPolicy limits database access"
    ],

    tech: [
      "Kubernetes",
      "Calico",
      "StatefulSet",
      "PVC",
      "MySQL"
    ],

    outcome:
      "Repeatable scheduling, controlled traffic and persistent application data.",

    nodes: [
      ["USR", "Users", "External request"],
      ["NP", "NodePort", "Port 30080"],
      ["WP", "WordPress ×3", "Deployment"],
      ["SVC", "MySQL Service", "ClusterIP 3306"],
      ["PVC", "MySQL + PVC", "StatefulSet"]
    ]
  },

  jenkins: {
    index: "SYSTEM 03",
    state: "AUTOMATED",
    mapTitle: "JENKINS / RELEASE FLOW",

    title: "Automated Static-Site Delivery",

    summary:
      "A Git-driven pipeline that validates and securely transfers a static release between dedicated Jenkins and Nginx EC2 instances.",

    decisions: [
      "Pipeline configuration stored with application code",
      "SSH key authentication over the private network",
      "HTTP health check confirms every deployment"
    ],

    tech: [
      "GitHub",
      "Jenkins",
      "SSH",
      "rsync",
      "Nginx"
    ],

    outcome:
      "One-click, repeatable delivery from source control to production.",

    nodes: [
      ["DEV", "Developer", "Git push"],
      ["GH", "GitHub", "Main branch"],
      ["J", "Jenkins EC2", "Validate & build"],
      ["SSH", "rsync", "Private transfer"],
      ["NGX", "Nginx EC2", "Production :80"]
    ]
  },

  observability: {
    index: "SYSTEM 04",
    state: "OBSERVED",
    mapTitle: "OBSERVABILITY / SIGNAL FLOW",

    title: "EC2 Monitoring & Alerting Stack",

    summary:
      "A monitoring pipeline that converts Linux host telemetry into dashboards and real-time incident notifications.",

    decisions: [
      "Node Exporter exposes host-level metrics",
      "Prometheus evaluates the InstanceDown rule",
      "Alertmanager routes actionable events to Slack"
    ],

    tech: [
      "Node Exporter",
      "Prometheus",
      "Grafana",
      "Alertmanager",
      "Slack"
    ],

    outcome:
      "Visible infrastructure health and rapid notification when a service fails.",

    nodes: [
      ["EC2", "Linux Host", "CPU · RAM · disk"],
      ["EXP", "Node Exporter", "Metrics :9100"],
      ["PRO", "Prometheus", "Scrape & evaluate"],
      ["GRA", "Grafana", "Dashboards"],
      ["ALT", "Slack Alerts", "Incident response"]
    ]
  }
};

const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  [...document.querySelectorAll(selector)];

function renderSystem(key) {
  const system = systems[key];

  $("#systemIndex").textContent =
    system.index;

  $("#systemState").textContent =
    system.state;

  $("#mapTitle").textContent =
    system.mapTitle;

  $("#systemTitle").textContent =
    system.title;

  $("#systemSummary").textContent =
    system.summary;

  $("#systemOutcome").textContent =
    system.outcome;

  $("#systemDecisions").innerHTML =
    system.decisions
      .map(item => `<li>${item}</li>`)
      .join("");

  $("#systemTech").innerHTML =
    system.tech
      .map(item => `<b>${item}</b>`)
      .join("");

  system.nodes.forEach((node, index) => {
    const number = index + 1;

    $(`#nodeIcon${number}`).textContent =
      node[0];

    $(`#nodeName${number}`).textContent =
      node[1];

    $(`#nodeMeta${number}`).textContent =
      node[2];
  });

  $$(".map-node").forEach(node => {
    node.classList.remove("selected");
  });

  $(".map-node.n3").classList.add("selected");
}

/*
 * Change the selected architecture.
 */
$$(".system-button").forEach(button => {
  button.addEventListener("click", () => {
    $$(".system-button").forEach(item => {
      item.classList.remove("active");
      item.setAttribute(
        "aria-pressed",
        "false"
      );
    });

    button.classList.add("active");

    button.setAttribute(
      "aria-pressed",
      "true"
    );

    renderSystem(button.dataset.system);
  });
});

/*
 * Highlight a selected architecture node.
 */
$$(".map-node").forEach(node => {
  node.addEventListener("click", () => {
    $$(".map-node").forEach(item => {
      item.classList.remove("selected");
    });

    node.classList.add("selected");
  });
});
